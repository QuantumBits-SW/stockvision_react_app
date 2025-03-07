import React, { useState } from "react";
import { Modal, Box, Typography, Tabs, Tab, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Prediction from "./Prediction";
import HistoricalChart from "./HistoricalChart";
import RealTrades from "./RealTrades";

const StockModal = ({ open, onClose, symbol }) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Stock Analysis - {symbol}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs value={tabIndex} onChange={(event, newIndex) => setTabIndex(newIndex)} centered>
          <Tab label="Stock Data" />
          <Tab label="Real-Time" />
          <Tab label="Prediction Analysis" />
        </Tabs>

        <Box mt={2}>
          {tabIndex === 0 && <HistoricalChart symbol={symbol} />}
          {tabIndex === 1 && <RealTrades symbol={symbol} />}
          {tabIndex === 2 && <Prediction />}
        </Box>
      </Box>
    </Modal>
  );
};

export default StockModal;
