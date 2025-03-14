import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import StockModal from "./StockModal";

const stockList = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "JPM", "JNJ", "V",
  "PG", "DIS", "MA", "PYPL", "NFLX", "ADBE", "INTC", "CMCSA", "PFE", "KO",
  "PEP", "CSCO", "XOM", "ABT", "CRM", "NKE", "MRK", "WMT", "T", "BAC",
  "MCD", "COST", "CVX", "MDT", "NEE", "LLY", "HON", "ORCL", "AVGO", "TXN",
  "UNH", "QCOM", "BMY", "IBM", "AMD", "AMAT", "GE", "CAT", "MMM", "GS"
];

const StockSelector = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (symbol) => {
    setSelectedStock(symbol);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Select a Stock to Analyze
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, display: "inline-block", borderRadius: 2 }}>
        {stockList.map((symbol) => (
          <Button
            key={symbol}
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleOpenModal(symbol)}
          >
            {symbol}
          </Button>
        ))}
      </Paper>
      {modalOpen && <StockModal open={modalOpen} onClose={handleCloseModal} symbol={selectedStock} />}
    </Box>
  );
};

export default StockSelector;