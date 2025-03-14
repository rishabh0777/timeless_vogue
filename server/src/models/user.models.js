import mongoose from 'mongoose';
import Cart from './cart.models.js';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        length: [6, 'The length of Fullname should equal more than 6'],
        trim: true,
        index: true
    },
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        length: [6, 'The length of Username should equal or more than 6']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        length: [8, 'Length of the password should be equal or less than 8']
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
}, {timestamps: true})

//save hash password -->
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password)
    next();
})

//generate access token --->
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)}
//generate refresh token --->
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)}




const User = mongoose.model('User', userSchema)
export default User;