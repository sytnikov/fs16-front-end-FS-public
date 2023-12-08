import { ChangeEvent, FormEvent, useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import { loginUserAsync } from "../redux/reducers/authReducer";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({ email: "", password: "" });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLogInData({ ...logInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAsync(logInData));
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 20, minHeight: "40rem" }}>
      <Paper elevation={3} sx={{ padding: "16px" }}>
        <Typography variant="h5" gutterBottom>
          Log into TopSpin Store
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={logInData.email}
            onChange={onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={logInData.password}
            onChange={onChangeHandler}
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
          <Box mt={2}>
            <Link
              to="/register"
              style={{ textDecoration: "underline", color: "inherit" }}
            >
              Don't have an account yet?
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
