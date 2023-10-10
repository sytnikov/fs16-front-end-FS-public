import { useState } from "react";

import AddProductModalProps from "../types/AddProductModalProps";
import CreateProductInput from "../types/CreateProductInput";

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductCategoryId, setNewProductCategoryId] = useState("");
  const [newProductImages, setNewProductImages] = useState("");

  const newProduct: CreateProductInput = {
    title: newProductTitle,
    price: Number(newProductPrice),
    description: newProductDescription,
    categoryId: Number(newProductCategoryId),
    images: Array(newProductImages),
  };

  const onAddClick = () => {
    onAddProduct(newProduct);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <div>
        <span onClick={onClose}>
          &times;
        </span>
        <h2>Add a new product</h2>
        <input
          type="text"
          placeholder="Title"
          value={newProductTitle}
          onChange={(e) => setNewProductTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Category ID"
          value={newProductCategoryId}
          onChange={(e) => setNewProductCategoryId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image link"
          value={newProductImages}
          onChange={(e) => setNewProductImages(e.target.value)}
        />
        <button onClick={onAddClick}>Add</button>
      </div>
    </div>
  );
};

export default AddProductModal;
