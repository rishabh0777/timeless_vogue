import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { addAddress } from "../contexts/AddressContext";

const Address = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    user,
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

 

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const addNewAddress = async (e) => {
  e.preventDefault(); 

  if (!user) {
    console.log("User not found!");
    return;
  }

  try {
    const myAddress = await addAddress(formData);
    if (myAddress?.data?.statusCode === 200) {
      setSuccess("Address saved successfully!");
      setError("");
      navigate("/cart");
    } else {
      setError("Failed to save address.");
      setSuccess("");
    }
  } catch (error) {
    setError("Something went wrong while saving address.");
    console.error(error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-zinc-100">
      <div className="bg-white max-w-xl w-full p-8 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {editId ? "Edit Address" : "Add New Address"}
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={addNewAddress} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address Line</label>
            <input
              name="addressLine"
              type="text"
              value={formData.addressLine}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Street, Locality"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1">City</label>
              <input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="City"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">State</label>
              <input
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="State"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1">Pincode</label>
              <input
                name="pincode"
                type="text"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Pincode"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">Country</label>
              <input
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="Country"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            {editId ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
