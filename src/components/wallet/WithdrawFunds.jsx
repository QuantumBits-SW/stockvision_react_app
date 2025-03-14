import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosInstance from "../../utils/interceptors";

const WithdrawFunds = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleWithdraw = async () => {
        if (!stripe || !elements) return;
        setLoading(true);
        setMessage("");

        // ✅ Create a Payment Method for the card
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            setMessage("Error: " + error.message);
            setLoading(false);
            return;
        }

        // ✅ Send withdrawal request to backend
        const response = await axiosInstance.post("/wallet/withdraw", {
          amount: amount,
          paymentMethodId: paymentMethod.id
        });

        const data = response.data;
        if (data.payoutId) {
            setMessage("Withdrawal successful!");
        } else {
            setMessage("Error: " + data.error);
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Withdraw Funds</h2>
            <CardElement />
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleWithdraw} disabled={loading}>
                {loading ? "Processing..." : "Withdraw"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default WithdrawFunds;
