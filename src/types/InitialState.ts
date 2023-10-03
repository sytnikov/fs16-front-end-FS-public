import CartItem from "./CartItem"
import Product from "./Product"

export interface InitialProductsState {
  products: Product[]
  loading: boolean
  error?: string
}

export interface InitialCartState {
  cartItems: CartItem[]
}