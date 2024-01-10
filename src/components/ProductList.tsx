import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  DeleteOutline,
  ModeOutlined,
} from "@mui/icons-material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  deleteProductAsync,
  fetchAllProductsAsync,
  reset,
  updateProductAsync,
} from "../redux/reducers/productsReducer";
import UpdateProductInput from "../types/UpdateProductInput";
import Spinner from "./Spinner";
import UpdateProductModal from "./UpdateProductModal";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading, isError } = useAppSelector(
    (state) => state.productsReducer
  );
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState("");

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const updatingProductDetails = products.find(
    (product) => product._id === updatingProduct
    );
    
  const updatedProducts = products.map((p) => {
    const { _id, ...rest } = p;
    return { id: _id, ...rest };
  });

  const onOpenUpdateProduct = (productId: string) => {
    setIsUpdateProductOpen(true);
    setUpdatingProduct(productId);
  };

  const onCloseUpdateProduct = () => {
    setIsUpdateProductOpen(false);
    setUpdatingProduct("");
  };

  const onUpdateProduct = async (updatedProduct: UpdateProductInput) => {
    const product = await dispatch(updateProductAsync(updatedProduct));
    if (product) {
      toast.success("Product successfully updated")
    }
    setIsUpdateProductOpen(false);
  };

  const onDeleteProduct = (id: string) => {
    setOpenConfirmation(true);
    setProductId(id);
  };

  const handleDeleteConfirmed = () => {
    if (productId) {
      dispatch(deleteProductAsync(productId)).then(() => {
        toast.success("Product successfully deleted")
        dispatch(fetchAllProductsAsync());
      });
      setOpenConfirmation(false);
      setProductId(null);
    }
  };

  const handleCancelDeletion = () => {
    setOpenConfirmation(false);
    setProductId(null);
  };

  const columns: GridColDef[] = [
    {
      field: "images",
      headerName: "Avatar",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value[0]}
          alt="Product"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 350 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "categoryId",
      headerName: "Category",
      width: 180,
      renderCell: (params) => <span>{params.value.name}</span>,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="update"
            onClick={() => onOpenUpdateProduct(params.row.id)}
          >
            <ModeOutlined />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => onDeleteProduct(params.row.id)}
          >
            <DeleteOutline />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Box sx={{ margin: "2rem" }}>
      <DataGrid
        rows={updatedProducts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {isUpdateProductOpen &&
        updatingProductDetails &&
        (updatingProduct === updatingProductDetails._id) && (
          <UpdateProductModal
            isOpen={isUpdateProductOpen}
            onClose={onCloseUpdateProduct}
            productId={updatingProduct}
            product={updatingProductDetails}
            onUpdateProduct={onUpdateProduct}
          />
        )}
      <Dialog
        open={openConfirmation}
        onClose={handleCancelDeletion}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDeletion}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
