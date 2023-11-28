import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserList from "../components/UserList";
import useAppSelector from "../hooks/useAppSelector";

const DashboardPage = () => {
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (!(currentUser && currentUser.role === "admin")) {
      navigate('/');
    }
  }, [])
  
  return (
    <Box sx={{minHeight: "40rem"}}>
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
    </Box>
  );
};

export default DashboardPage;
