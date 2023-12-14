import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  MenuItem,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";

import AddProductModalProps from "../types/AddProductModalProps";
import CreateProductInput from "../types/CreateProductInput";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { fetchAllCategoriesAsync } from "../redux/reducers/categoriesReducer";

const AddProductModal: FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const [newProductInfo, setNewProductInfo] = useState<CreateProductInput>({
    name: "Asics Gel Resolution 9 AC Black/Camel Men's Shoes",
    price: 76,
    description: "Test description",
    categoryId: "",
    images: ["https://img.tenniswarehouse-europe.com/watermark/rs.php?path=AMGR9CB-1.jpg&nw=1080"],
    stock: 20,
  });

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync())
  }, [dispatch])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.name === "price") {
      setNewProductInfo({
        ...newProductInfo,
        [e.target.name]: parseFloat(e.target.value),
      });
    } else if (e.target.name === "stock") {
      setNewProductInfo({
        ...newProductInfo,
        [e.target.name]: parseInt(e.target.value),
      });
    } else if (e.target.name === "images") {
      setNewProductInfo({
        ...newProductInfo,
        [e.target.name]: Array(e.target.value),
      });
    } else {
      setNewProductInfo({
        ...newProductInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onAddClick = () => {
    onAddProduct(newProductInfo);
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
      <Box
        sx={{
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
        }}
      >
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Add a new product
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          type="text"
          variant="outlined"
          name="name"
          label="Title"
          value={newProductInfo.name}
          onChange={onChangeHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="price"
          label="Price"
          value={newProductInfo.price}
          onChange={onChangeHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={3}
          type="text"
          name="description"
          label="Description"
          value={newProductInfo.description}
          onChange={onChangeHandler}
        />
        <TextField
          select
          fullWidth
          margin="normal"
          type="text"
          name="categoryId"
          label="Category"
          value={newProductInfo.categoryId}
          onChange={onChangeHandler}
        >
          {categories &&
            categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          type="text"
          name="images"
          label="Images"
          value={newProductInfo.images}
          onChange={onChangeHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          name="stock"
          label="Stock"
          value={newProductInfo.stock}
          onChange={onChangeHandler}
        />
        <Button fullWidth variant="contained" onClick={onAddClick}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
