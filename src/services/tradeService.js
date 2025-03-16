import axiosInstance from "../utils/interceptors";

export const placeOrder = async (order) => {
  try {
    return await axiosInstance.post("/orders/buy", order);
  } catch (error) {
    console.log("Failed to place order:", error);
    throw error;
  }
}

export const sellOrder = async (order) => {
  try {
    return await axiosInstance.post("/orders/sell", order);
  } catch (error) {
    console.log("Failed to place order:", error);
    throw error;
  }
}

export const getPortfolio = async () => {
  try {
    return await axiosInstance.get("/portfolio");
  } catch (error) {
    console.log("Failed to fetch portfolio:", error);
    throw error;
  }
}

export const getOrders = async () => {
  try {
    return await axiosInstance.get("/orders/history");
  } catch (error) {
    console.log("Failed to fetch orders:", error);
    throw error;
  }
}
