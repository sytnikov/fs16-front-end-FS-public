import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllUserOrdersAsync } from "../redux/reducers/ordersReducer";
import Spinner from "./Spinner";

const OrdersList = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.authReducer);
  const { orders, isLoading } = useAppSelector((state) => state.ordersReducer);
  const updatedOrders = orders.map((order) => {
    const { _id, ...rest } = order;
    return { id: _id, ...rest };
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAllUserOrdersAsync(currentUser._id));
    }
  }, [currentUser, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order Number", width: 250 },
    { field: "totalAmount", headerName: "Total Amount", width: 200 },
    { field: "createdAt", headerName: "Creation Date", width: 200 },
  ];

  return (
    <>
      {orders.length === 0 && (
        <Box className="heading">
          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
            There are no orders yet.
          </Typography>
          <Button
            href="/"
            variant="contained"
            sx={{
              color: "inherit",
              mt: 3,
            }}
          >
            Continue shopping
          </Button>
        </Box>
      )}
      {orders.length > 0 && (
        <Box sx={{ margin: "2rem" }}>
        <DataGrid
          rows={updatedOrders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
        
      </Box>
      )}
    </>
  );
};

export default OrdersList;
