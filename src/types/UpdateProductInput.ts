import CreateProductInput from "./CreateProductInput";

type UpdateProductInput = {
  update: Partial<CreateProductInput>,
  _id: string
} 

export default UpdateProductInput