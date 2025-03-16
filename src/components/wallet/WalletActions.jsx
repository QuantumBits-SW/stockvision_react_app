import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import FundsModal from "./FundsModal";

const WalletActions = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("withdraw");

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    return (
        <Stack spacing={2} sx={{ width: "100%", mt: 2 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        padding: "10px",
                        width: "100%",
                        "&:hover": { backgroundColor: "#0056b3" },
                    }}
                    onClick={() => openModal("deposit")}
                >
                    Deposit Funds
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#D81B60",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        padding: "10px",
                        width: "100%",
                        "&:hover": { backgroundColor: "#A71347" },
                    }}
                    onClick={() => openModal("withdraw")}
                >
                    Withdraw Funds
                </Button>
            </motion.div>

            <FundsModal open={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />
        </Stack>
    );
};

export default WalletActions;
