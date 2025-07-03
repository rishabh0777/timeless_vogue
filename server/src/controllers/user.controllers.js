import User from "../models/user.models.js";
import {ApiError} from '../utils/apiError.js';
import { ApiResponse } from "../utils/apiResponse.js";
import asyncHandler from '../utils/asyncHandler.js';
import sendEmail from '../utils/sendMail.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    }catch(error){
        throw new ApiError(500, 'Something went wrong while generating refresh and access token');
    }
} 
const register = asyncHandler(async (req, res)=>{
    // get data from frontend
    //validate data 
    //check user if already exists
    // register data in database
    // send mail to verify email
    const {
        fullname,
        email,
        username,
        password
    } = req.body
    if(
        [fullname, email, username, password].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400, "all fields are mandatery")
    } 
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409, "The user is already exists")
    }

    const token = jwt.sign(
        {username, email, password, fullname}, 
        process.env.JWT_SECRET,
        {expiresIn: "15m"}
        ); 
    //Email verification Link
    if(!token){
        // console.log('Token not found')
        throw new ApiError(400, "Token not found")
        return
    }
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`
    // send email
    await sendEmail(
        email,
        "Verify Your Email",
        `
            <h2>Email Verification</h2>
            <p>Click the Link below to verify your email:</p>
            <a href="${verificationLink}">Verify Email</a>
        `
        )

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Verification email sent. Please check your inbox."))
})

const verifyEmail = asyncHandler(async (req, res)=>{
    const {token} = req.query;
    if(!token){
        throw new ApiError(400, "Invalid token")
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {username, email, fullname, password} = decoded;

        const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409, "The user is already exists")
    }
    const createdUser = await User.create({
        fullname,
        username,
        email,
        password
    }) 
    return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully" ))
    }catch(error){
        throw new ApiError(400, "Invalid or expired token")
    }
})

const login = asyncHandler(async (req, res)=>{
    // get user data from frontend
    // validate data
    // find user from db
    // compare password with hashed password
    // generate access and refresh token
    // send cookie
    // send message and user

    const {
        username,
        email,
        password
    } = req.body;
    if(!username && !email){
        throw new ApiError(400, "Email or username is required")
    }
    if(
        [username || email, password].some((fields)=>{
            fields?.trim()===""
        })
    ){
        throw new ApiError(400, "all fields are mandatery")
    }

    const existedUser = await User.findOne({
        $or:[{email}, {username}]
    })
    if(!existedUser){
        throw new ApiError(404, "User not found")
    }
    const isPasswordValid = await existedUser.matchPassword(password)
    if(!isPasswordValid){
        throw new ApiError(404, 'Invalid user credential')
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(existedUser._id) 

    const loggedInUser = await User.findById(existedUser._id)
    .select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secured: true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
            new ApiResponse(
                200, 
                {
                    user:loggedInUser,
                    refreshToken,
                    accessToken
                }, 
                "User Logged in Successfully")
        )

}) 

    const logout = asyncHandler(async (req, res)=>{
        // clear cookie
        //delete refresh token
        await User.findByIdAndUpdate(
               new mongoose.Types.ObjectId(req.user?._id),
                {$set: {
                    refreshToken: 1
                }},
                {new: true}
            )
    const options = {
            httpOnly: true,
            secure: true
            }

            return res.
            status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged Out"));
    })




export {
    register,
    verifyEmail,
    login,
    logout,
    generateAccessAndRefreshTokens
}