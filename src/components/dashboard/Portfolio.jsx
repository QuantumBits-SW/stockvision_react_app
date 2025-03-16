import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import StockModal from "../charts/StockModal";
import { getPortfolio } from "../../services/tradeService";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  
  const handleOpenModal = (symbol) => {
    setSelectedStock(symbol);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await getPortfolio();
        setPortfolio(response.data);
      } catch (err) {
        setError("Failed to load portfolio.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) return <p className="text-gray-500">Loading portfolio...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6 w-[90vw] mx-auto">
      {/* Total Invested & Total Value */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Invested</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            ${portfolio.totalInvested.toFixed(2)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Value</CardTitle>
          </CardHeader>
          <CardContent className={`text-2xl font-semibold ${portfolio.totalValue < portfolio.totalInvested ? "text-red-500" : "text-green-500"}`}>
            ${portfolio.totalValue.toFixed(2)}
            {portfolio.totalValue < portfolio.totalInvested ? "  (-" : "  (+"}
            {((portfolio.totalValue - portfolio.totalInvested) / portfolio.totalInvested * 100).toFixed(2)}%{")"}
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 flex justify-end items-center">
                <TableCell className="font-semibold w-[18%]">Symbol</TableCell>
                <TableCell className="font-semibold w-[18%]">Quantity</TableCell>
                <TableCell className="font-semibold w-[18%]">Avg Price</TableCell>
                <TableCell className="font-semibold w-[18%]">Invested</TableCell>
                <TableCell className="font-semibold w-[18%]">Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.holdings.map((holding) => (
                <TableRow key={holding.id} className="hover:bg-gray-50 flex justify-end items-center">
                  <TableCell className="font-medium w-[18%]">{holding.symbol}</TableCell>
                  <TableCell className="w-[18%]">{holding.quantity}</TableCell>
                  <TableCell className="w-[18%]">${holding.averagePrice.toFixed(2)}</TableCell>
                  <TableCell className="w-[18%]">${holding.totalInvested.toFixed(2)}</TableCell>
                  <TableCell className="w-[18%]">
                    <Button variant="contained" color="primary" size="small" onClick={() => handleOpenModal(holding.symbol)}>Track</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        {modalOpen && (
          <StockModal
            open={modalOpen} 
            onClose={handleCloseModal} 
            symbol={selectedStock}
            mode="sell"
          />
        )}
    </div>
  );
};

export default Portfolio;
