import { User } from "../models/user.js";
import bcrypt from "bcryptjs"; // safely using passwords using hashed password
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({})

    const keyword = req.query.keyword;
    console.log(keyword);

    res.json({
        success: true,
        users,
    })
}

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax":"none",
        secure: process.env.NODE_ENV === "Development" ? false:true,
    }).json({
        success:true,
        user:req.user,
    })
}

export const register = async (req, res) => {
    // const {name, email, password} = req.body;

    // await User.create({
    //     name,
    //     email,
    //     password,
    // })

    // res.json({
    //     success:true,
    //     message: "Registered Successfully",
    // })

    //<--using jwt-->


    const { name, email, password } = req.body;

    // Check if user already exists
    console.log(name,email,password);
    let user = await User.findOne({ email });

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exists",
        });
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered Successfully", 201)
}

export const getMyProfile = (req, res) => {
    // const { id } = req.params;
    // const user = await User.findById(id);

    // res.status(200).json({
    //     success: true,//for security reasons
    //     user,
    // })

    // <-- Using JWT -->

    res.status(200).json({
        success: true,//for security reasons
        user:req.user,
    })
}

export const login = async (req, res) => {
    const {email, password}  = req.body;

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(404).json({
            success:true,
            message:"Invalid Email or Password",
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(404).json({
            success:false,
            message:"Invalid Email or Password",
        })
    }

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
}