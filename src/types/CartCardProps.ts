import CartItem from "./CartItem";

type CartCardProps = {
  cartItem: CartItem;
  onDeleteFromCart: (item: CartItem) => void;
  onIncreaseQuantity: (id: string) => void
  onDecreaseQuantity: (id: string) => void
}

export default CartCardProps