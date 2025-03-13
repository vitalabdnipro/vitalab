import { api } from "utils/api";
import { useCart } from "medusa-react";

export const useAddItem = () => {
  const { cart, setCart } = useCart();
  const mutation = api.cart.add.useMutation({
    onSuccess: (cart) => {
      setCart(cart);
      // storeCart(cart.id);
      // timedOpen();
    },
  });
  // console.log("from hook",cart);
  return mutation;
};
