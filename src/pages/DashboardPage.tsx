import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { createProductAsync } from "../redux/reducers/productsReducer";
import UserList from "../components/UserList";
import ProductList from "../components/ProductList";
import AddProductModal from "../components/AddProductModal";
import CreateProductInput from "../types/CreateProductInput";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const onAddProductClick = () => {
    setIsAddProductOpen(true)
  }
  
  const onAddProduct = async (newProduct: CreateProductInput) => {
    const createdProduct = await dispatch(createProductAsync(newProduct));
    setIsAddProductOpen(false);
    if (createdProduct) {
      toast.success("New product successfully created")
    }
  }

  return (
    <Box sx={{ minHeight: "40rem" }}>
      <Box className="heading">
        <Typography sx={{ fontSize: "36px", fontWeight: "900" }}>
          Admin dashboard
        </Typography>
      </Box>
      <Box>
        <Box className="heading">
          <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
            Users list
          </Typography>
        </Box>
        <UserList />
      </Box>
      <Box>
        <Box
          className="heading"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
            Products list
          </Typography>
          <Tooltip title="Create a new product">
            <Button
              variant="contained"
              onClick={onAddProductClick}
              sx={{ color: "inherit" }}
            >
              Add product
            </Button>
          </Tooltip>
        </Box>
        <AddProductModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onAddProduct={onAddProduct}
        />
        <ProductList />
      </Box>
    </Box>
  );
};

export default DashboardPage;
