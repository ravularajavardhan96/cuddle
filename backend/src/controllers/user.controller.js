import bcrypt,{hash} from 'bcrypt';
import { User } from '../models/user.model.js';
import httpStatus from 'http-status';
import crypto from 'crypto'
const register = async(req,res)=>{
    console.log("This is working");
     
    const {username,password,name} = req.body;

    const existinguser = await User.findOne({username});
    if(existinguser){
        console.log("This is working");
     

        return res.status(httpStatus.CONFLICT).json({message:"User already exists"});
    }

    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            password:hashedPassword,
            name
        })
        await newUser.save();
        return res.status(httpStatus.CREATED).json({message:"User registered succesfully"});
    }
    catch(e){
       return res.json({message:"something went wrong"});
    }
}

const login = async(req,res)=>{
        const {username,password} = req.body;
        console.log(req.body);

    // return res.status(200).json({message:"Login successful"});
    console.log('This is wokring');
    // const {username,password} = req.body;
    

    if(!username || !password){
        return res.status(400).json({message:"Please provide credentials"});
    }
    try{
        const user =await User.findOne({username});
        console.log(user);
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"user not found"});
        }
        console.log(user);
        if(await bcrypt.compare(password,user.password)){
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({token:token});
        }
    }
    catch(e){
        return res.status(500).json({message:"Something went wrong"});

    }
}

export {login,register};