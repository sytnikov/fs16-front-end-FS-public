import { Typography, Link, Container, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        p: 2,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} TopSpin Store, LLC. All rights reserved
        </Typography>
        <Box className="social-list">
          <Link color="inherit" href="https://www.instagram.com/">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link color="inherit" href="https://twitter.com/">
          <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link color="inherit" href="https://www.facebook.com/">
          <FontAwesomeIcon icon={faFacebook} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
