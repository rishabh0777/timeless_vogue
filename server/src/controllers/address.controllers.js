import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Address from "../models/address.models.js";



//Code for add Address -->
export const addAddress = asyncHandler(async (req, res) => {
  const { userId, name, phone, addressLine, city, state, pincode, country } = req.body;

  if (
    [userId, name, phone, addressLine, city, state, pincode, country].some(
      (field) => typeof field !== 'string' || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are mandatory!");
  }

  const existingAddresses = await Address.find({ userId });

  if (existingAddresses.length >= 3) {
    throw new ApiError(402, "Maximum of 3 addresses allowed!");
  }

  const createdAddress = await Address.create({
    userId,
    name,
    phone,
    addressLine,
    city,
    state,
    pincode,
    country,
  });

  if (!createdAddress) {
    throw new ApiError(500, "Something went wrong while creating the address.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdAddress, "Address added successfully!"));
});



// update address -->
export const updateAddress = asyncHandler(async (req, res)=>{
  const {id} = req.params;

  const {
    name,
    phone,
    addressLine,
    city,
    state,
    pincode,
    country
  } = req.body

  const address = await Address.findById(id);
  if(!address){
    throw new ApiError(404, "Address not found");
  }

  // update fields
  address.name = name || address.name;
  address.phone = phone || address.phone;
  address.addressLine = addressLine || address.addressLine;
  address.city = city || address.city;
  address.state = state || address.state;
  address.pincode = pincode || address.pincode;
  address.country =  country || address.country;

  await address.save();

  return res
  .status(200)
  .json(new ApiResponse(200, address, "Address updated successfully"));
});



//remove address -->
export const deleteAddress = asyncHandler(async (req, res)=>{
  const {id} = req.body;
  const address = await Address.findById(id);
  if(!address){
    throw new ApiError(404, "Address not found");
  }

  await address.deleteOne();

  return res
  .status(200)
  .json(new ApiResponse(200, null, "Address deleted successfully"));
});


//Get Address -->
export const getAddress = asyncHandler(async (req, res)=>{
  const userId = req.user._id;
  if(!userId){
    throw new ApiError(404, "userId not found: Failed to fetch address!");
  }
  try{
    const existingAddress = await Address.find({userId});
    if(!existingAddress){
      throw new ApiError(400, "Failed while fetching Address");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, existingAddress, "Successfully fetched Address!"));
  }catch(error){
    throw new ApiError(500, `Something Went wrong: ${error}`)
  }
});
