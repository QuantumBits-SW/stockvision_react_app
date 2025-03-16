import { Modal, Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import WithdrawFunds from "./WithdrawFunds";
import DepositFunds from "./DepositFunds"; 

const FundsModal = ({ open, onClose, type }) => {
    return (
        <Modal open={open} onClose={onClose} aria-labelledby="funds-modal">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    outline: "none",
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                        {type === "withdraw" ? "Withdraw Funds" : "Deposit Funds"}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>

                {type === "withdraw" ? <WithdrawFunds onClose={onClose} /> : <DepositFunds onClose={onClose} />}
            </Box>
        </Modal>
    );
};

export default FundsModal;
