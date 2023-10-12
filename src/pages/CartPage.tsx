import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { deleteFromCart } from "../redux/reducers/cartReducer";

import CartItem from "../types/CartItem";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();

  const onDeleteFromCart = (item: CartItem) => {
    dispatch(deleteFromCart(item))
  }

  return (
    <div>
      <p>Items in the cart</p>
      {cartItems &&
        cartItems.map((item) => (
          <div key={item.id}>
            {item.id} {item.title} {item.quantity}
            <button onClick={() => onDeleteFromCart(item)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default CartPage;
