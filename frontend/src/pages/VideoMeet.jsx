import React, { useRef, useState } from "react";

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

    let [videoAvailable,setVideoAvailable] = useState([true]);
    let [audioAvailable,setAudioAvailable] = useState(true);
    let [video,setVideo] = useState([]);
    let [audio,setAudio] = useState([]);
    let [screen,setScreen] = useState();
    let [showModal,setModel] = useState(true);
    let [ screenAvailable,setScreenAvailable] = useState();
    let [messages,setMessages] = useState([]);
    let [message,setMessage] = useState("");
    let [newMessages,setNewMessages] = useState(3);
    let [ askForUsername,setAskForUsername] = useState(true);
    let[username,setUsername] = useState("");
    const videoRef = useRef([])
    let [ videos,setVideos] = useState([])

return(
    <h1>This is a video meet component</h1>
)
}