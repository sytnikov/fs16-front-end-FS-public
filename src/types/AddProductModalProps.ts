import CreateProductInput from "./CreateProductInput"

type AddProductModalProps = {
  isOpen: boolean,
  onClose: () => void,
  onAddProduct: (newProduct: CreateProductInput) => void
}

export default AddProductModalProps