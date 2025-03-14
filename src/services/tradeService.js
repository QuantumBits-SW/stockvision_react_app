import axiosInstance from "../utils/interceptors";

export const placeOrder = async (order) => {
  try {
    return await axiosInstance.post("/orders/buy", order);
  } catch (error) {
    console.log("Failed to place order:", error);
    throw error;
  }
}
