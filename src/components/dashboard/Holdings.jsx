import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/interceptors";
import { GET_USER_HOLDINGS } from "../../utils/constants";
import { useDispatch, useSelector  } from "react-redux";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(()=>{
      axiosInstance.get(`${GET_USER_HOLDINGS}/${user.id}`).then((response) =>{
        setHoldings(response.data);
      }).catch((error)=>{
        console.error("Error fetching holdings", error);
      })
  }, []);


  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Your Holdings</h1>
      <div className="space-y-4">
        {holdings.map((stock) => (
          <motion.div
            key={stock.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-gray-800 shadow-lg rounded-xl p-4">
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <Typography variant="h6" className="text-black font-semibold">
                      {stock.tickerId}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      Qty: {stock.buyQuantity}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      Invested: ${(stock.buyPrice * stock.buyQuantity).toFixed(2)}
                    </Typography>
                  </div>
                  <div className="text-right">
                   
                    <Typography variant="body2" className="text-gray-700">
                      Current Price: ${(stock.buyPrice).toFixed(2)} USD
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                      Bought Price: ${(stock.currentPrice).toFixed(2)} USD
                    </Typography>
                    <Typography
                      variant="body1"
                      className={
                        stock.profitLoss >= 0
                          ? "text-green-400 font-bold"
                          : "text-red-400 font-bold"
                      }
                    >
                      {stock.profitLoss >= 0 ? "+" : ""}${stock.profitLoss.toFixed(2)}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Holdings;
