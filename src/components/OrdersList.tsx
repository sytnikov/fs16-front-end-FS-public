import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import Spinner from "./Spinner";
import { fetchAllUserOrdersAsync } from "../redux/reducers/ordersReducer";

const OrdersList = () => {
  const { currentUser } = useAppSelector((state) => state.authReducer);
  const { orders, isLoading } = useAppSelector((state) => state.ordersReducer);
  const updatedOrders = orders.map((order) => {
    const { _id, ...rest } = order;
    return { id: _id, ...rest };
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAllUserOrdersAsync(currentUser._id));
    }
  }, [currentUser, dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message)
  //   }
  //   dispatch(fetchAllUsersAsync());
  //   return () => {
  //     dispatch(reset())
  //   }
  // }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order Number", width: 250 },
    { field: "totalAmount", headerName: "Total Amount", width: 200 },
    { field: "createdAt", headerName: "Creation Date", width: 130 },
  ];

  return (
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
  );
};

export default OrdersList;
