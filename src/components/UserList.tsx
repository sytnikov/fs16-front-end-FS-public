import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllUsersAsync } from "../redux/reducers/usersReducer";

const UserList = () => {
  const users = useAppSelector((state) => state.usersReducer.users);
  const updatedUsers = users.map((user) => {
    const { _id, ...rest } = user;
    return { id: _id, ...rest };
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, []);

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 270 },
    { field: "roleId", headerName: "Role", width: 130, renderCell: (params) => <span>{params.value.name.toLowerCase()}</span> },
  ];
  return (
    <Box sx={{ margin: "2rem" }}>
      <DataGrid
        rows={updatedUsers}
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

export default UserList;
