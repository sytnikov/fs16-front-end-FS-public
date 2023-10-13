import CartItem from "./CartItem";

interface CartCardProps {
  cartItem: CartItem;
  onDeleteFromCart: (item: CartItem) => void;
  onIncreaseQuantity: (id: number) => void
  onDecreaseQuantity: (id: number) => void
}

export default CartCardProps