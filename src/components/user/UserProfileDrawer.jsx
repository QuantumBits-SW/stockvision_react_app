import React, { useState } from "react";
import { Drawer, Button, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../../services/firebaseAuth";
import { useNavigate } from "react-router-dom";
import DepositFunds from "../wallet/DepositFunds";

const UserProfileDrawer = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        Profile
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px",
            backgroundColor: "oklch(0.21 0.034 264.665)", 
            color: "white", 
            padding: "20px",
            boxShadow: "-4px 0px 10px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", 
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
            User Profile
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>

        <Divider sx={{ marginBottom: "20px", backgroundColor: "#A4B0C0" }} />

        {user ? (
          <>
            <Typography sx={{ fontSize: "16px", marginBottom: "15px" }}>
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginBottom: "15px" }}>
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginBottom: "25px" }}>
              <strong>Email:</strong> {user.email}
            </Typography>

            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{
                borderRadius: "20px",
                padding: "10px",
                marginTop: "auto", 
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Typography>No user information available.</Typography>
        )}
        <DepositFunds />
      </Drawer>
    </>
  );
};

export default UserProfileDrawer;
