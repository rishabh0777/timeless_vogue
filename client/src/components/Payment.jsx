import React, { useContext } from "react";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { AddressContext } from "../contexts/AddressContext";
import {PaymentContext} from "../contexts/PaymentContext";

const Payment = () => {
  const { cart } = useContext(DataContext);
  const { addresses, selectedAddress } = useContext(AddressContext);
  const {initiatePayment} = useContext(PaymentContext);
 



 

  const totalAmount = cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const selectedAddr = addresses.find((a) => a._id === selectedAddress);

 const createMyOrder = async () => {
  if (!selectedAddr) return;

  try { 
    await initiatePayment({
    totalAmount,
    cartItems: cart.items,
    selectedAddr
  });
  } catch (error) {
    console.error("Payment initiation failed:", error);
  }
};

  return (
    <div className="w-full px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 border border-zinc-200">
        <h2 className="text-2xl font-semibold mb-4">🧾 Order Summary</h2>

        <div className="mb-6 space-y-4">
          {cart.items.map((item) => (
            <div key={item.productId._id} className="flex justify-between border-b pb-2">
              <div>
                <h3 className="font-medium">{item.productId.title}</h3>
                <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-semibold">
                ₹{(item.productId.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">📍 Delivery Address</h3>
          {selectedAddr ? (
            <div className="text-sm leading-6 text-zinc-700">
              <p><span className="font-medium">{selectedAddr.name}</span> - {selectedAddr.phone}</p>
              <p>{selectedAddr.addressLine}, {selectedAddr.city}</p>
              <p>{selectedAddr.state} - {selectedAddr.pincode}</p>
              <p>{selectedAddr.country}</p>
            </div>
          ) : (
            <p className="text-red-500">No address selected!</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Total:</span>
          <span className="text-xl font-bold text-green-600">₹{totalAmount}</span>
        </div>

        <button
          onClick={createMyOrder}
          disabled={!selectedAddr}
          className={`w-full py-3 rounded-md text-white font-semibold transition ${
            selectedAddr
              ? "bg-green-600 hover:bg-green-700"
              : "bg-zinc-400 cursor-not-allowed"
          }`}
        >
          Proceed to Pay ₹{totalAmount}
        </button>
      </div>
    </div>
  );
};

export default Payment;
