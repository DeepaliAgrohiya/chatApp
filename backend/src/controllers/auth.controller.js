import User from "../models/user.model.js"
import bycript from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res)=>{
    const {fullname, email, password} = req.body;
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message: "All fields are required."})
        }

        if(password.length<6){
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bycript.genSalt(10);
        const hashedPassword = await bycript.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })

        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
        }
        else{
            res.status(400).json({message: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in Signup controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
        
    }
}

export const login = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }

        const isPasswordCorrect = await bycript.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid email or password"});
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged Out Successfully"});
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const updateProfile = async (req, res)=>{
    try {
        const profilePic = req.body.profilePic;
        const userId = req.user._id;
        
        if (!profilePic) {
            return res.status(400).json({ message: "Invalid Profile Pic data." });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true});

        res.status(200).json(updatedUser);

        
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
        
    }
}

export const checkAuth =  (req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
        
    }
}
