import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import { createUserAsync } from "../redux/reducers/usersReducer";
import CreateUserInput from "../types/CreateUserInput";

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(
    "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE"
  );
  const newUser: CreateUserInput = {
    name: name,
    email: email,
    password: password,
    avatar: avatar,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUserAsync(newUser));
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 20, minHeight: "40rem" }}>
      <Paper elevation={3} sx={{ padding: "16px" }}>
        <Typography variant="h5" gutterBottom>
          Sign up to ECO
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Profile picture"
            variant="outlined"
            fullWidth
            name="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignupPage;
