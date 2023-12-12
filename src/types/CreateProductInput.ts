type CreateProductInput = {
  name: string,
  price: number,
  description: string,
  categoryId: string,
  images: string[],
  stock?: number
}

export default CreateProductInput