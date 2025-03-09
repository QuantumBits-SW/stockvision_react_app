import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { GET_ALL_STOCKS } from "../../utils/constants";
import axiosInstance from "../../utils/interceptors";
import StockSelector from "../charts/StockSelector";

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  useEffect(()=>{
    axiosInstance.get(`${GET_ALL_STOCKS}`).then((response) =>{
      setStocks(response.data);
    }).catch((error)=>{
      console.error("Error ffetching stocks", error);
    })
}, []);


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Stock Trading Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(Array.isArray(stocks) ? stocks : []).map((stock) => (
          <div key={stock.id} className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <img
                src={`https://logo.clearbit.com/tesla.com`}
                alt={stock.stockName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{stock.stockName}</h2>
            <p className="text-gray-500">{stock.stockTiker}</p>
            <p className="text-green-600 font-bold mt-2">
              {stock.currentPrice} USD
            </p>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Buy
            </Button>

          </div>
        ))}
      </div>
      <StockSelector />
    </div>
  );
};

export default StockDashboard;
