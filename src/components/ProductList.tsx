import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { deleteProductAsync, fetchAllProductsAsync } from "../redux/reducers/productsReducer";
import { DeleteOutline, ModeOutlined } from "@mui/icons-material";

const ProductList = () => {
  const products = useAppSelector((state) => state.productsReducer.products);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const updatedProducts = products.map((p) => {
    const { _id, ...rest } = p;
    return { id: _id, ...rest };
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, []);

  const onDeleteProduct = (id: string) => {
    setOpenConfirmation(true);
    setProductId(id);
  };

  const handleDeleteConfirmed = () => {
    if (productId) {
      dispatch(deleteProductAsync(productId)).then(() => {
        dispatch(fetchAllProductsAsync())
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
          alt="Image"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 350 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "categoryId", headerName: "Category", width: 180, renderCell: (params) => <span>{params.value.name}</span> },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
        <IconButton>
          <ModeOutlined />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => onDeleteProduct(params.row.id)}>
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
        // checkboxSelection
      />
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
