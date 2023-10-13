import { Box, Button, Typography } from "@mui/material";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  decreaseQuantity,
  deleteFromCart,
  emptyCart,
  increaseQuantity,
} from "../redux/reducers/cartReducer";

import CartItem from "../types/CartItem";
import CartCard from "../components/CartCard";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();

  const onDeleteFromCart = (item: CartItem) => {
    dispatch(deleteFromCart(item));
  };
  const onIncreaseQuantity = (id: number) => {
    dispatch(increaseQuantity(id));
  };
  const onDecreaseQuantity = (id: number) => {
    dispatch(decreaseQuantity(id));
  };
  const onEmptyCart = () => {
    dispatch(emptyCart());
  };

  const totalItems = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalSum = cartItems.reduce(
    (prev, curr) => prev + curr.quantity * curr.price,
    0
  );

  return (
    <Box>
      <Box className="heading">
        <Typography sx={{ fontSize: "36px", fontWeight: "900" }}>
          Shopping cart
        </Typography>
      </Box>
      <Box className="product-list">
        <Box className="cart-list">
          {cartItems?.map((item) => (
            <Box key={item.id}>
              <CartCard
                cartItem={item}
                onDeleteFromCart={onDeleteFromCart}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ pr: 10 }}>
          <Typography sx={{ fontSize: "28px", fontWeight: "400" }}>
            Subtotal ({totalItems} items):{" "}
            <Typography
              component="span"
              sx={{ fontSize: "28px", fontWeight: "900" }}
            >
              ${totalSum}
            </Typography>
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              color: "white",
              backgroundColor: "#FFA814",
              mt: 3,
            }}
          >
            Proceed to checkout
          </Button>
          <Button variant="outlined" onClick={onEmptyCart} sx={{
              width: "100%",
              borderColor: "none",
              mt: 3,
            }}>Empty Cart</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
