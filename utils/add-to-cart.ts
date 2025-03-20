import axios from "@/lib/axios";
import { takeCartId } from "./take-cart-id";

export const addToCart = async (
  idProduct: string | number,
  quantity: number,
) => {
  const idCart = await takeCartId();

  try {
    const response = await axios.post("/api/cart/items", {
      cartId: idCart,
      productId: idProduct,
      quantity: quantity,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return false;
  }
};
