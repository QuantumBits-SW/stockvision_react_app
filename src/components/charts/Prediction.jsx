import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Prediction = () => {
  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="center" height={300}>
        <Typography variant="body1" color="textSecondary">
          Prediction feature is coming soon... 🚀
        </Typography>
      </Box>
    </Paper>
  );
};

export default Prediction;