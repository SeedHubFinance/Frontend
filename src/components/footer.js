import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" padding="">
        <Typography
          variant="h3"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          MUI
        </Typography>
      </AppBar>
    </Box>
  );
};

export default Footer;
