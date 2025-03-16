import React, { useState } from "react";
import { useStockData } from "../../context/StockProvider";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

const BuyModal = ({ symbol, isOpen, onClose }) => {
  const userId = useSelector((state) => state.auth.user.uid);
  const { lastPrice } = useStockData();
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = async () => {
    setLoading(true);
    setError("");

    const order = {
      symbol,
      orderType,
      action: "buy",
      quantity: Number(quantity),
      price: orderType === "limit" ? Number(limitPrice) : lastPrice,
      userId
    };

    try {
      if (orderType === "limit") {
        // ✅ Store Limit Order in Redis Trading Service
        await axios.post("http://localhost:5000/api/orders", order);
        console.log(`Stored limit order for ${symbol} at ${limitPrice} in Redis`);
      } else {
        // ✅ Execute Market Order Immediately
        await axios.post("http://localhost:8080/api/orders/buy", order);
      }
      onClose();
    } catch (err) {
      setError("Error placing order. Please try again.");
      console.error("Order Placement Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Buy {symbol}
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-500 text-sm">Live Price: ${lastPrice?.toFixed(2)}</p>

        <div className="flex flex-col gap-3 mt-4">
          <label className="text-sm font-medium">Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="market">Market</option>
            <option value="limit">Limit</option>
          </select>

          <label className="text-sm font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border rounded"
          />

          {orderType === "limit" && (
            <>
              <label className="text-sm font-medium">Limit Price</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="p-2 border rounded"
              />
            </>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-between mt-4">
          <Button
            onClick={handleBuy}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Confirm Buy"}
          </Button>
          <Button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
