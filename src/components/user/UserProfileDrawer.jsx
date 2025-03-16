import React, { useState } from "react";
import { Drawer, Button, Typography, IconButton, Divider, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../../services/firebaseAuth";
import { useNavigate } from "react-router-dom";
import WalletActions from "../wallet/WalletActions";

const UserProfileDrawer = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const closeProfileDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ borderRadius: "20px", backgroundColor: "#4F46E5", color: "white" }}
      >
        Profile
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={closeProfileDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "350px",
            backgroundColor: "#1E1E2F",
            color: "white",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px 0 0 10px",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" color="white">
            User Profile
          </Typography>
          <IconButton onClick={closeProfileDrawer}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>

        <Divider sx={{ backgroundColor: "#A4B0C0", marginBottom: "20px" }} />

        {user ? (
          <Box>
            <Typography sx={{ fontSize: "16px", marginBottom: "10px" }}>
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginBottom: "10px" }}>
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginBottom: "20px" }}>
              <strong>Email:</strong> {user.email}
            </Typography>

            <WalletActions />
          </Box>
        ) : (
          <Typography>No user information available.</Typography>
        )}

        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{
            borderRadius: "10px",
            padding: "10px",
            marginTop: "auto",
            backgroundColor: "#E63946",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Drawer>
    </>
  );
};

export default UserProfileDrawer;
