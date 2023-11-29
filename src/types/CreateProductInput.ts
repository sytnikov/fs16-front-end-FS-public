interface CreateProductInput {
  name: string,
  price: number,
  description: string,
  categoryId: string,
  images: string[]
}

export default CreateProductInput