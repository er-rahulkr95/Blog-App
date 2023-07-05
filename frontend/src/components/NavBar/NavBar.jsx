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
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useDispatch } from "react-redux";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import HomeIcon from "@mui/icons-material/Home";
import {
  postContent,
  postImage,
  postTitle,
} from "../../features/blogPost/blogPostSlice";
import { toast } from "react-toastify";

const NavBar = ({ hasHiddenAuthButtons, hasHomeButton }) => {
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    toast.success("Logged Out Successfully!");
    // window.location.reload();
  };

  const handleCreatePostNav = () => {
    dispatch(postTitle(""));
    dispatch(postContent(""));
    dispatch(postImage(""));
    navigate("/post/create");
  };

  return (
    <nav className={styles.navBar}>
      <Box className={styles.navBarTitle} onClick={() => navigate("/")}>
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
          <Stack alignItems="center" direction="row" spacing={matches ? 2 : 0}>
            {hasHomeButton && (
              <Button
                className={styles.button}
                variant="text"
                onClick={() => navigate(`/`)}
              >
                {matches ? "Blogs" : <HomeIcon />}
              </Button>
            )}
            <Button
              className={styles.button}
              variant="text"
              onClick={() => navigate(`/user/dashboard/${userId}`)}
            >
              {matches ? "Dashboard" : <DashboardCustomizeIcon />}
            </Button>

            <Button
              className={styles.button}
              variant="text"
              onClick={() => handleCreatePostNav()}
            >
              {matches ? "Create Post" : <EditNoteIcon />}
            </Button>
            <Button
              className={styles.button}
              variant="text"
              onClick={handleLogout}
            >
              {matches ? "LOGOUT" : <LogoutIcon />}
            </Button>
            <Avatar
              src="avatar.png"
              alt={localStorage.getItem("fullName")}
              sx={{ bgcolor: "#673de6" }}
            >
              {localStorage.getItem("fullName")[0]}
            </Avatar>
          </Stack>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
