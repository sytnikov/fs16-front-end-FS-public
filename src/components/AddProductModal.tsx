import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { MenuItem, TextField } from "@mui/material";

import AddProductModalProps from "../types/AddProductModalProps";
import CreateProductInput from "../types/CreateProductInput";
import useAppSelector from "../hooks/useAppSelector";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 280,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 3,
};

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

  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );

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
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Add a new product
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          type="text"
          variant="outlined"
          label="Title"
          value={newProductTitle}
          onChange={(e) => setNewProductTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Price"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={3}
          type="text"
          label="Description"
          value={newProductDescription}
          onChange={(e) => setNewProductDescription(e.target.value)}
        />
        <TextField
          select
          fullWidth
          margin="normal"
          type="number"
          label="Category"
          value={newProductCategoryId}
          onChange={(e) => setNewProductCategoryId(e.target.value)}
        >
          {categories &&
            categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          type="text"
          label="Image link"
          value={newProductImages}
          onChange={(e) => setNewProductImages(e.target.value)}
        />
        <Button fullWidth variant="contained" onClick={onAddClick}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
