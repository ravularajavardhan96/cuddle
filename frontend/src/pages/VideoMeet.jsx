import React, { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import io from 'socket.io-client'


const server_url = "http://localhost:8000";
let connections = {};
const peerConfigConnections={
    "iceServers":[
        {"urls":"stun:stun.l.google.com:19302"}
    ]
}

export default function VideoMeet(){
    let socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef = useRef();
    const videoRef = useRef([])

    let [videoAvailable,setVideoAvailable] = useState(true);
    let [audioAvailable,setAudioAvailable] = useState(true);
    
    let [video,setVideo] = useState(false);
    let [audio,setAudio] = useState(false);
    
    let [screen,setScreen] = useState();
    let [showModal,setModel] = useState(true);
    let [ screenAvailable,setScreenAvailable] = useState();
    
    let [messages,setMessages] = useState([]);
    let [message,setMessage] = useState("");
    let [newMessages,setNewMessages] = useState(3);
    
    let [ askForUsername,setAskForUsername] = useState(true);
    let[username,setUsername] = useState("");
  
    let [ videos,setVideos] = useState([]);

    let gotMessageFromServer =()=>{}

    let addMessage =()=>{}

    let connectToSocketServer=()=>{
        socketRef.current = io.connect(server_url,{secure:false});
        socketRef.current.on('signal',gotMessageFromServer);

        socketRef.current.on('connect',()=>{

            socketRef.current.emit('join-call',window.location.href);
            socketIdRef.current = socketRef.current.id;
            
            socketRef.current.on("chat-message",addMessage);

            socketRef.current.on("user-left",(id)=>{
                setVideos((videos)=>videos.filter((video)=>video.scoketId!==id))
            })
            socketRef.current.on("user-joined",(id,clients)=>{
                clients.forEach((socketListId)=>{
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
                    connections[socketListId].onicecandidate =(event)=>{
                        if(event.candidate !==null){
                            socketRef.current.emit("signal",socketListId,JSON.stringiry({'ice':event.candidate}))
                        }
                    }
                    cp
                })
            })
        })
    }

    const getPermissions =async ()=>{
        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});
            if(videoPermission){
                setVideoAvailable(true);
            }else {
                setVideoAvailable(false);
            }

            const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true});
            if(audioPermission){
                setAudioAvailable(true);
            }else {
                setAudioAvailable(false);
            }

            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true);
            }else{
                setScreenAvailable(false);
            }

            if(videoAvailable || audioAvailable){
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video:videoAvailable,audio:audioAvailable});
                if(userMediaStream){
                    window.localStream = userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }
        }catch(e){
            console.log(e);
        }

        

    }
    let getUserMediaSuccess = (stream)=>{
        
    }

    let getUserMedia=()=>{
        if((video && videoAvailable) ||(audio && audioAvailable)){
            navigator.mediaDevices.getUserMedia({video:video,audio:audio})
            .then(()=>{})
            .then((stream)=>{})
            .catch((e)=>{
                console.log(e);
            })
        }else{

            try{
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track=>track.stop())
            }catch(e){}
        }
    }

    useEffect(()=>{
        getPermissions();
    },[]);

    useEffect(()=>{
        if(video!==undefined && audio!=undefined){
            getUserMedia();
        }
    },[audio,video]);

    let getMedia = ()=>{
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();

    }


return(
  <>
  {askForUsername && <> <h1>Enter into the lobby</h1>
    <TextField id="outlined-basic" label="username" value={username} onChange={e=>setUsername(e.target.value)} variant="outlined" />
    <Button variant="contained" onClick={connectToSocketServer}>connect</Button>

    <div>
        <video ref={localVideoRef} autoPlay muted></video>
    </div>
</> }
   
    </>

)
}