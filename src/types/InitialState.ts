import CartItem from "./CartItem"
import Product from "./Product"
import User from "./User"

export interface ProductsReducerState {
  products: Product[]
  loading: boolean
  error?: string
}

export interface CartReducerState {
  cartItems: CartItem[]
}

export interface UsersReducerState {
  users: User[],
  currentUser?: User,
  error?: string
}