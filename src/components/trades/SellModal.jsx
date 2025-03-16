import React, { useState } from "react";
import { useStockData } from "../../context/StockProvider";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sellOrder } from "@/services/tradeService";

const SellModal = ({ symbol, isOpen, onClose }) => {
  const userId = useSelector((state) => state.auth.user.uid);
  const { lastPrice } = useStockData();
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1);
  const [stopPrice, setStopPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSell = async () => {
    setLoading(true);
    setError("");

    const order = {
      symbol,
      orderType,
      action: "sell",
      quantity: Number(quantity),
      userId
    };

    if (orderType === "market") {
      order.price = lastPrice;
    } else if (orderType === "stop") {
      order.limit = 0;
      order.price = Number(stopPrice);
    } else if (orderType === "oco") {
      order.limit = Number(limitPrice);
      order.stop = Number(stopPrice);
    }

    try {
      if (orderType === "market") {
        await sellOrder(order);
      } else {
        await axios.post("http://localhost:5000/api/orders", {
          symbol,
          orderType: "oco",
          limit, 
          stop, 
          quantity, 
          userId 
        });
        console.log(`Stored ${orderType} sell order for ${symbol} in Redis`);
      }
      onClose();
    } catch (err) {
      setError("Error placing sell order. Please try again.");
      console.error("Sell Order Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Sell {symbol}
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
            <option value="stop">Stop Loss</option>
            <option value="oco">OCO (One Cancels the Other)</option>
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

          {orderType === "stop" && (
            <>
              <label className="text-sm font-medium">Stop Price</label>
              <input
                type="number"
                value={stopPrice}
                onChange={(e) => setStopPrice(e.target.value)}
                className="p-2 border rounded"
              />
            </>
          )}

          {orderType === "oco" && (
            <>
              <label className="text-sm font-medium">Limit Price</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="p-2 border rounded"
              />

              <label className="text-sm font-medium">Stop Price</label>
              <input
                type="number"
                value={stopPrice}
                onChange={(e) => setStopPrice(e.target.value)}
                className="p-2 border rounded"
              />
            </>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-between mt-4">
          <Button
            onClick={handleSell}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Confirm Sell"}
          </Button>
          <Button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SellModal;
