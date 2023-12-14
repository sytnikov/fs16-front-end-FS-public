import CartItem from "./CartItem"

type CreateOrderInput = {
  userId: string,
  products: {
    productId: string,
    quantity: number,
  }[]
}

export default CreateOrderInput