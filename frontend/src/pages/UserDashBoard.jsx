import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  allPost,
  userDashBoardBlogs,
} from "../features/blogPost/blogPostAction";
import BlogPostCard from "../components/BlogPostCard/BlogPostCard";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Loader from "../components/Loader/Loader";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashBoard = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { userBlog, loading, error } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  const loadPost = () => {
    dispatch(userDashBoardBlogs(userId));
  };

  const checkBlogExists = () => {
    if (userBlog.length === 0)
      if (error && error.includes("500")) {
        toast.warning("It seems you dont have any let's create one");
        navigate("/post/create");
      }
  };

  useEffect(() => {
    loadPost();
    checkBlogExists();
  }, []);

  return (
    <div>
      <NavBar hasHomeButton />
      <Hero isDashBoard />
      <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {!loading ? (
              <Loader />
            ) : (
              userBlog.map((post, index) => (
                <Grid item xs={12} sm={4} md={4} key={index}>
                  <BlogPostCard
                    id={post._id}
                    title={post.title}
                    content={post.content}
                    image={post.image ? post.image.url : ""}
                    subheader={moment(post.createdAt).format("MMMM DD, YYYY")}
                    comments={post.comments.length}
                    likes={post.likes.length}
                    likesId={post.likes}
                    postedBy={post.postedBy.fullName}
                    loadPost={loadPost}
                    isDashBoard
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default UserDashBoard;
