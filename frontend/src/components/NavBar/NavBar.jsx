import { Box } from "@mui/system";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import styles from "./NavBar.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const NavBar = ({ hasHiddenAuthButtons }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  return (
    <nav className={styles.navBar}>
      <Box className={styles.navBarTitle}>
        <h2>QBlogs</h2>
      </Box>
      <Box>
        {hasHiddenAuthButtons && (
          <Button
            className={styles.exploreButton}
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={() => navigate("/")}
          >
            Back to Blogs
          </Button>
        )}
        {!hasHiddenAuthButtons && !localStorage.getItem("username") && (
          <Stack direction="row" spacing={1}>
            <Button className={styles.button} variant="text">
              Blogs
            </Button>
            <Button
              className={styles.button}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              {matches ? "Login" : <LoginIcon />}
            </Button>
            <Button
              className={styles.button}
              variant="contained"
              onClick={() => navigate("/register")}
            >
              {matches ? "Register" : <LockPersonIcon />}
            </Button>
          </Stack>
        )}
        {!hasHiddenAuthButtons && localStorage.getItem("username") && (
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar src="avatar.png" alt={localStorage.getItem("username")} />
            <div>{localStorage.getItem("username")}</div>
            <Button className={styles.button} variant="text">
              {matches ? "LOGOUT" : <LogoutIcon />}
            </Button>
          </Stack>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
