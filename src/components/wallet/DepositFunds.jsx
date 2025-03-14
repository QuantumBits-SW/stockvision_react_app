import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosInstance from "../../utils/interceptors";

const DepositFunds = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDeposit = async () => {
    if (!stripe || !elements) {
      setMessage("Stripe is not properly initialized.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ Send request to backend to create a checkout session
      const response = await axiosInstance.post("/wallet/deposit", { amount });

      // ✅ Axios automatically parses JSON, use response.data
      if (response.data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
      } else {
        setMessage("Error: " + (response.data.error || "Unknown error"));
      }
    } catch (error) {
      setMessage("Error processing payment: " + (error.response?.data?.error || error.message));
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Deposit Funds</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit} disabled={loading}>
        {loading ? "Processing..." : "Deposit"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DepositFunds;
