import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

import useAppDispatch from "../hooks/useAppDispatch";
import { createUserAsync } from "../redux/reducers/usersReducer";
import useAppSelector from "../hooks/useAppSelector";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({name: "", email: "", password: ""})
  const { message } = useAppSelector(state => state.usersReducer)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(createUserAsync(userInfo));
    if (resultAction.meta.requestStatus === "fulfilled") {
      toast.success("Account successfully created");
      navigate("/login");
    } else if (resultAction.meta.requestStatus === "rejected") {
      toast.error(message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 20, minHeight: "40rem" }}>
      <Paper elevation={3} sx={{ padding: "16px" }}>
        <Typography variant="h5" gutterBottom>
          Create a TopSpin Store account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={userInfo.name}
            onChange={onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={userInfo.email}
            onChange={onChangeHandler}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={userInfo.password}
            onChange={onChangeHandler}
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
