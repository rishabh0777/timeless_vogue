// models/address.model.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: String,
  phone: String,
  addressLine: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
},{timestamps: true});

const Address = mongoose.model("Address", addressSchema);
export default Address;
