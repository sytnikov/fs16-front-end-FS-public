import { Button, Container, Typography, Box, Link } from "@mui/material";

const ErrorPage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "40rem",
        }}
      >
        <Typography variant="h3" color="error" sx={{ m: 3 }}>
          Seems to be we're on the wrong way...
        </Typography>
        <Typography variant="h5" sx={{ m: 3 }}>
          The page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/"
          sx={{ m: 3 }}
        >
          Go back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
