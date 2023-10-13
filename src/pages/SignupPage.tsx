import { FormEvent, useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { createUserAsync } from "../redux/reducers/usersReducer";
import CreateUserInput from "../types/CreateUserInput";

const SignupPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=826&t=st=1697154846~exp=1697155446~hmac=a3cd0cc3cd6fae6d41c989a361bc5aa5b2fe3b5fe69c665cc1cdd2d7748e13bd")

  const newUser: CreateUserInput = {
    name: name,
    email: email,
    password: password,
    avatar: avatar,
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUserAsync(newUser));
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 20 }}>
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
