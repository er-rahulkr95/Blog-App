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
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch } from "react-redux";
import { userLogOut } from "../../features/userAuthentication/userAuthAction";

const NavBar = ({ hasHiddenAuthButtons }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () =>{
      dispatch(userLogOut())
      window.location.reload();
  }
    

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
        {!hasHiddenAuthButtons && !localStorage.getItem("token") && (
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
        {!hasHiddenAuthButtons && localStorage.getItem("token") && (
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar src="avatar.png" alt={localStorage.getItem("fullName")} />
            <div className={styles.userName}>{localStorage.getItem("fullName")}</div>
            <Button className={styles.button} variant="text" onClick={()=>navigate("/post/create")}>
              {matches ? "Create Post" : <LogoutIcon />}
            </Button>
            <Button className={styles.button} variant="text" onClick={handleLogout}>
              {matches ? "LOGOUT" : <EditNoteIcon />}
            </Button>
          </Stack>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
