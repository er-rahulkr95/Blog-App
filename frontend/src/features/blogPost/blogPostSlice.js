import { createSlice } from "@reduxjs/toolkit";
import {
    addComments,
    addLike,
    allPost,
    deletePost,
    fetchPost,
    postSubmit,
    postUpdate,
    removeLike,
    userDashBoardBlogs,
} from "./blogPostAction";

export const blogPost = createSlice({
    name: "blogPost",
    initialState: {
        title: "",
        content: "",
        image: "",
        loading: false,
        allBlog: [],
        like: [],
        commentText: "",
        postContent: {
            title: "",
            content: "",
            like: "",
            postedBy: { _id: "", fullName: "" },
            comments: [],
            image: { url: "" },
            createdAt: "",
            _id: "",
        },
        userBlog: [],
        comments: [],
    },

    reducers: {
        postTitle: (state, action) => {
            state.title = action.payload;
        },
        postContent: (state, action) => {
            state.content = action.payload;
        },
        postImage: (state, action) => {
            state.image = action.payload;
        },
        postComment: (state, action) => {
            state.commentText = action.payload;
        },
    },
    extraReducers: {
        [postSubmit.pending]: (state) => {
            state.loading = true;
        },
        [postSubmit.fulfilled]: (state) => {
            state.title = "";
            state.content = "";
            state.image = "";
            state.loading = false;
        },
        [postSubmit.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [postUpdate.pending]: (state) => {
            state.loading = true;
        },
        [postUpdate.fulfilled]: (state) => {
            state.loading = false;
        },
        [postUpdate.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [fetchPost.pending]: (state) => {
            state.loading = false;
        },
        [fetchPost.fulfilled]: (state, action) => {
            if (action.payload) {
                state.postContent = { ...action.payload };
                state.title = action.payload.title;
                state.content = action.payload.content;
                state.image = "";
                state.loading = true;
            }
        },
        [fetchPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [allPost.pending]: (state) => {
            state.loading = false;
        },
        [allPost.fulfilled]: (state, action) => {
            if (action.payload) {
                state.allBlog = [...action.payload];
                state.loading = true;
            }
        },
        [allPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [addLike.pending]: (state) => {
            state.like = 0;
        },
        [addLike.fulfilled]: (state, action) => {
            if (action.payload) {
                state.allBlog = [...action.payload];
            }
        },
        [addLike.rejected]: (state, action) => {
            state.like = 0;
            state.error = action.payload.message;
        },
        [removeLike.pending]: (state) => {
            state.like = 0;
        },
        [removeLike.fulfilled]: (state, action) => {
            if (action.payload) {
                state.allBlog = [...action.payload];
            }
        },
        [removeLike.rejected]: (state, action) => {
            state.like = 0;
            state.error = action.payload.message;
        },
        [userDashBoardBlogs.pending]: (state) => {
            state.loading = false;
        },
        [userDashBoardBlogs.fulfilled]: (state, action) => {
            if (action.payload) {
                state.userBlog = [...action.payload];
                state.loading = true;
            }
        },
        [userDashBoardBlogs.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [addComments.pending]: (state) => {
            state.comments = [];
        },
        [addComments.fulfilled]: (state, action) => {
            if (action.payload) {
                state.postContent = { ...action.payload };
                state.commentText = "";
            }
        },
        [addComments.rejected]: (state, action) => {
            state.error = action.payload.message;
        },
        [deletePost.pending]: (state) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            if (action.payload) {
                state.userBlog = [...action.payload];
            }
        },
        [deletePost.rejected]: (state, action) => {
            state.error = action.payload.message;
        },
    },
});

export default blogPost.reducer;

export const { postTitle, postContent, postImage, postComment } =
    blogPost.actions;
