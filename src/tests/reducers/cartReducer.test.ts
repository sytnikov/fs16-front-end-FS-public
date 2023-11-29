import cartReducer, { addToCart, decreaseQuantity, deleteFromCart, emptyCart, increaseQuantity } from "../../redux/reducers/cartReducer"
import { CartReducerState } from "../../types/InitialState"
import cartData from "../data/cartData"
import productsData from "../data/productsData"

const state: CartReducerState = {
  cartItems: cartData
}

describe("Test normal cartReducer actions", () => {
  test("Should add a product to the cart", () => {
    const cart = cartReducer(state, addToCart(productsData[2])).cartItems
    expect(cart.length).toBe(3)
  })

  test("Should not add the same product to the cart, but increase the quantity", () => {
    const cart = cartReducer(state, addToCart(productsData[1])).cartItems
    expect(cart.length).toBe(2)
    expect(cart[1].quantity).toBe(21)
  })

  test("Should increase the number of product items in the cart", () => {
    const cart = cartReducer(state, increaseQuantity(cartData[0].id)).cartItems
    expect(cart[0].quantity).toBe(2)
  })

  test("Should decrease the number of product items in the cart", () => {
    const cart = cartReducer(state, decreaseQuantity(cartData[1].id)).cartItems
    expect(cart[1].quantity).toBe(19)
  })

  test("Should delete a product from the cart when the quantity becomes < 1", () => {
    const cart = cartReducer(state, decreaseQuantity(cartData[0].id)).cartItems
    expect(cart.length).toBe(1)
  })

  test("Should delete a product from the cart", () => {
    const cart = cartReducer(state, deleteFromCart(cartData[0])).cartItems
    expect(cart.length).toBe(1)
    expect(cart[0].id).toBe("2")
  })

  test("Should empty the cart", () => {
    const cart = cartReducer(state, emptyCart()).cartItems
    expect(cart.length).toBe(0)
  })
})