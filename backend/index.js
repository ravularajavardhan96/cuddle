import express from 'express';
console.log("🔥 BACKEND FILE LOADED");

import mongoose from 'mongoose';
import {createServer} from 'node:http';
import {Server} from "socket.io"
import { Socket } from 'node:dgram';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './src/routes/users.routes.js';
import {connectToSocket} from './src/controllers/socketManager.js';
dotenv.config();
const app = express();
const server = createServer(app); 

// const server = connectToSocket(server);
const io = new Server(server);
app.set("port",(process.env.PORT  || 8000));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/api/users",userRoutes);
app.get("/home",(req,res)=>{
    res.send("This is home");
})


const start = async()=>{
    app.listen(app.get("port"),()=>{
        console.log("The app started");
    })
    const mongo = await mongoose.connect('mongodb+srv://ravularajavardhan96:rajavardhan96@cuddle.iidhisl.mongodb.net/?appName=cuddle');
    // console.log(mongo);
}

start();