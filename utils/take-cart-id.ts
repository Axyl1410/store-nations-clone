import axios from "@/lib/axios";
import { getCookie } from "cookies-next";

export const takeCartId = async () => {
  const id = getCookie("idUser");
  if (!id) return;

  try {
    const response = await axios.post("/api/cart", { customerId: id });
    if (response.data && response.data.CartID)
      return response.data.data.CartID.toString();
  } catch (error) {
    console.error("Error fetching cart ID:", error);
  }
  return;
};
