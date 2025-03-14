import React, { useState } from "react";
import { useStockData } from "../../context/StockProvider";
import { placeOrder } from "../../services/tradeService";

const BuyModal = ({ symbol, onClose }) => {
  const { lastPrice } = useStockData();
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = async () => {
    setLoading(true);
    setError("");

    const orderData = {
      symbol,
      orderType,
      action: "buy",
      quantity: Number(quantity),
      price: orderType === "limit" ? Number(limitPrice) : lastPrice
    };

    try {
      await placeOrder(orderData);
      alert("Order placed successfully!");
      onClose(); // Close modal after successful order
    } catch (err) {
      setError("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-[999] fixed inset-0 flex items-center justify-center bg-black/20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-2">Buy {symbol}</h2>
        <p className="text-sm text-gray-500 mb-2">Live Price: ${lastPrice?.toFixed(2)}</p>

        {/* Order Type Selection */}
        <label className="block font-medium mb-1">Order Type</label>
        <select 
          value={orderType} 
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="market">Market</option>
          <option value="limit">Limit</option>
        </select>

        {/* Quantity */}
        <label className="block font-medium mb-1">Quantity</label>
        <input 
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          className="w-full border p-2 rounded mb-3"
        />

        {/* Limit Price (Only for Limit Orders) */}
        {orderType === "limit" && (
          <>
            <label className="block font-medium mb-1">Limit Price</label>
            <input 
              type="number" 
              value={limitPrice} 
              onChange={(e) => setLimitPrice(e.target.value)} 
              className="w-full border p-2 rounded mb-3"
            />
          </>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <button 
            onClick={handleBuy} 
            className="bg-green-500 text-white py-2 px-4 rounded font-semibold hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Confirm Buy"}
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-400 text-white py-2 px-4 rounded font-semibold hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>

        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default BuyModal;
