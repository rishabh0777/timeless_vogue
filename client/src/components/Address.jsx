import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { addAddress, updateAddress } from "../contexts/AddressContext";
import AddressSkeleton from "../loaderComponents/AddressSkeleton";
import { toast } from "react-hot-toast"; // ✅ Add this line

const Address = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const user = JSON.parse(localStorage.getItem("user"));
  const url = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    userId: user?._id,
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (editId) {
      const fetchEditData = async () => {
        try {
          const res = await axios.get(`${url}/api/v1/address/${editId}`);
          if (res?.data?.statusCode === 200) {
            setFormData({ ...res.data.data, userId: user._id });
          }
        } catch (err) {
          toast.error("Unable to fetch address data."); // ✅ Toast error
        }
      };
      fetchEditData();
    }

    return () => clearTimeout(timer);
  }, [editId, user._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addNewAddress = async (e) => {
    e.preventDefault();
    try {
      const myAddress = await addAddress(formData);
      if (myAddress?.data?.statusCode === 200) {
        toast.success("Address saved successfully!"); // ✅ Toast success
        navigate("/cart");
      } else {
        toast.error("Failed to save address."); // ✅ Toast error
      }
    } catch (error) {
      toast.error("Something went wrong while saving address."); // ✅ Toast error
    }
  };

  const updateMyAddress = async (e) => {
    e.preventDefault();
    try {
      const updatedAddress = await updateAddress(editId, formData);
      if (updatedAddress?.data?.statusCode === 200) {
        toast.success("Address updated successfully!"); // ✅ Toast success
        navigate("/cart");
      } else {
        toast.error("Failed to update address."); // ✅ Toast error
      }
    } catch (error) {
      toast.error("Unable to update at this moment"); // ✅ Toast error
    }
  };

  if (isLoading) return <AddressSkeleton />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-xl w-full p-8 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {editId ? "Edit Address" : "Add New Address"}
        </h1>

        <form onSubmit={editId ? updateMyAddress : addNewAddress} className="space-y-4">
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
            className="w-full bg-zinc-800 text-white py-3 rounded hover:bg-zinc-700 transition"
          >
            {editId ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
