import User from "../models/user.models.js";
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from "../utils/apiResponse.js";
import {asyncHandler} from '../utils/asyncHandler.js'

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
        throw new ApiError(409, "The user is already exist")
    }
    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Something gone wrong while creating user")
    }
    return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully" ))
})

export {
    register,
    generateAccessAndRefreshTokens
}