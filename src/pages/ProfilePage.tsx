import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Avatar } from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";

const ProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  return (
    <Box>
      <Box className="heading">
        <Typography sx={{ fontSize: "36px", fontWeight: "900" }}>
          User Profile
        </Typography>
      </Box>
      <Paper elevation={3} style={{ padding: "16px", margin: 20 }}>
        {currentUser && (
          <Box className="user-profile">
            <Box>
              <Avatar
                src={currentUser.avatar}
                alt="user avatar pic"
                style={{ width: 150, height: 150 }}
              />
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Name:{" "}
                <Typography component="span" variant="h6">
                  {currentUser.name}
                </Typography>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Email:{" "}
                <Typography component="span" variant="h6">
                  {currentUser.email}
                </Typography>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Role:{" "}
                <Typography component="span" variant="h6">
                  {currentUser.role}
                </Typography>
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
