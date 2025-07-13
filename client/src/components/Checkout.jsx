import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const url = import.meta.env.VITE_API_BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const totalAmount = 1499;
  const cartItems = [
    { name: "Premium Shirt", quantity: 2, price: 598 },
    { name: "Classic Jeans", quantity: 1, price: 699 },
  ];

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get(`${url}/api/address/all/${userId}`);
      setAddresses(data.data);
    } catch (err) {
      toast.error("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAddress = async () => {
    try {
      const payload = { ...form, userId };
      await axios.post(`${url}/api/v1/address/add`, payload);
      setForm({
        name: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });
      toast.success("Address added successfully");
      fetchAddresses();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add address");
    }
  };

  const deleteAddress = async (id) => {
    const confirm = window.confirm("Delete this address?");
    if (!confirm) return;

    try {
      await axios.delete(`${url}/api/address/delete/${id}`);
      toast.success("Address deleted");
      fetchAddresses();
      if (selectedAddressId === id) setSelectedAddressId(null);
    } catch {
      toast.error("Failed to delete address");
    }
  };

  const handlePayment = async () => {
    const selectedAddress = addresses.find((a) => a._id === selectedAddressId);
    if (!selectedAddress) return toast.error("Please select an address");

    const res = await loadRazorpayScript();
    if (!res) return toast.error("Razorpay SDK failed to load");

    try {
      const { data } = await axios.post(`${url}/api/payment/create-order`, {
        amount: totalAmount,
      });

      const { id: order_id, currency, amount } = data.data;

      const keyRes = await axios.get(`${url}/api/v1/payment/get-key`);
      const key = keyRes?.data?.key;

      const options = {
        key,
        amount,
        currency,
        name: "Timeless Vogue",
        description: "Payment",
        order_id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${url}/api/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              address: selectedAddress,
              cartItems,
              total: totalAmount,
            });

            toast.success("Payment successful!");

            const invoiceUrl = verifyRes.data.data.invoiceUrl;
            window.open(invoiceUrl, "_blank");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: selectedAddress.name,
          contact: selectedAddress.phone,
        },
        theme: { color: "#000000" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Error initiating payment");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-2">Add Address</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["name", "phone", "addressLine", "city", "state", "pincode", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded-md"
          />
        ))}
      </div>
      <button
        onClick={addAddress}
        className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
      >
        Save Address
      </button>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-2">Select Address</h2>
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className={`border p-4 rounded-md ${
              selectedAddressId === addr._id ? "border-black" : ""
            }`}
          >
            <input
              type="radio"
              name="selectedAddress"
              value={addr._id}
              checked={selectedAddressId === addr._id}
              onChange={() => setSelectedAddressId(addr._id)}
              className="mr-2"
            />
            <strong>{addr.name}</strong> — {addr.addressLine}, {addr.city}, {addr.state} -{" "}
            {addr.pincode}, {addr.country}. 📞 {addr.phone}
            <button
              onClick={() => deleteAddress(addr._id)}
              className="ml-4 text-red-500 underline text-sm"
            >
              Delete
            </button>
          </div>
        ))}
        {addresses.length === 0 && <p>No addresses saved yet.</p>}
      </div>

      <hr className="my-6" />

      {selectedAddressId && (
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-6 py-3 rounded-md text-lg hover:bg-green-700"
        >
          Pay ₹{totalAmount}
        </button>
      )}
    </div>
  );
};

export default Checkout;
