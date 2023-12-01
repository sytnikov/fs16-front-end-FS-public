import CreateProductInput from "./CreateProductInput";

interface UpdateProductInput {
  update: Partial<CreateProductInput>,
  _id: string
} 

export default UpdateProductInput