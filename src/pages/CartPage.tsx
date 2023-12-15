import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
import { createOrderAsync, reset } from "../redux/reducers/ordersReducer";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const currentUser = useAppSelector((state) => state.authReducer.currentUser)
  const orderProducts = cartItems.map((item) => {
    return {
      productId: item._id,
      quantity: item.quantity
    }
  })
  const totalItems = cartItems.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalSum =
    Math.round(
      cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0) *
        100
    ) / 100;

  const onDeleteFromCart = (item: CartItem) => {
    dispatch(deleteFromCart(item));
  };

  const onIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const onDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const onEmptyCart = () => {
    dispatch(emptyCart());
  };

  const onCheckout = async () => {
    if (currentUser) {
      const newOrder = await dispatch(createOrderAsync({userId: currentUser._id, products: orderProducts}))
      if (newOrder.meta.requestStatus === "fulfilled") {
        toast.success("Order successfully created")
        dispatch(reset())
        dispatch(emptyCart())
        navigate("/orders")
      }
    } else {
      navigate("/login")
      toast.info("You need to log in to check out")
    }
  }

  return (
    <Box sx={{ minHeight: "40rem" }}>
      <Box className="heading">
        <Typography sx={{ fontSize: "36px", fontWeight: "900" }}>
          Shopping cart
        </Typography>
      </Box>
      {cartItems.length > 0 && (
        <Box className="product-list">
          <Box className="cart-list">
            {cartItems?.map((item) => (
              <Box key={item._id}>
                <CartCard
                  cartItem={item}
                  onDeleteFromCart={onDeleteFromCart}
                  onIncreaseQuantity={onIncreaseQuantity}
                  onDecreaseQuantity={onDecreaseQuantity}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ m: 2 }}>
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
                color: "inherit",
                mt: 3,
              }}
              onClick={onCheckout}
            >
              Proceed to checkout
            </Button>
            <Button
              variant="outlined"
              onClick={onEmptyCart}
              sx={{
                width: "100%",
                borderColor: "none",
                mt: 3,
              }}
            >
              Empty Cart
            </Button>
          </Box>
        </Box>
      )}
      {cartItems.length === 0 && (
        <Box className="heading">
          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
            There are no items in the cart yet.
          </Typography>
          <Button
            href="/"
            variant="contained"
            sx={{
              color: "inherit",
              mt: 3,
            }}
          >
            Continue shopping
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
