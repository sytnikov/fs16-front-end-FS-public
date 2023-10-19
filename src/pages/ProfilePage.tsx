// import { useEffect } from "react";
// import useAppSelector from "../hooks/useAppSelector";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const currentUser = useAppSelector((state) => state.authReducer.currentUser);
//   const navigate = useNavigate();

//   useEffect(()=>{
//     if (!currentUser) {
//       navigate('/');
//     }
//   }, [])

//   return (
//     <div>
//       <p>ProfilePage</p>
//       {currentUser && (
//         <div>
//           <p>{currentUser.name}</p>
//           <p>{currentUser.email}</p>
//           <p>{currentUser.role}</p>
//           <img src={currentUser.avatar} alt="user avatar pic" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import { Container, Paper, Typography, Box, Avatar } from "@mui/material";

const ProfilePage = () => {
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const navigate = useNavigate();

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
              <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
                Name:{" "}
                <Typography component="span" variant="h6">
                  {currentUser.name}
                </Typography>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
                Email:{" "}
                <Typography component="span" variant="h6">
                  {currentUser.email}
                </Typography>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}}>
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
