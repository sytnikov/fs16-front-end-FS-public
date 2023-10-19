import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllUsersAsync } from "../redux/reducers/usersReducer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const UserList = () => {
  const users = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, []);

  const columns: GridColDef[] = [
    { field: "avatar", headerName: "", width: 70, renderCell: (params) => (
      <img
        src={params.value}
        alt="Avatar"
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
      />
    ), },
    { field: "id", headerName: "ID", width: 30 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "role", headerName: "Role", width: 130 },
  ];
  return (
    <Box sx={{ margin: "1rem" }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  );
};

export default UserList;
