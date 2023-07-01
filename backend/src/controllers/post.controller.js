const PostService = require("../services/post.service");
const PostServiceInstance = new PostService();
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const findPostById = catchAsync(async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await PostServiceInstance.findWithId(postId);
    if (result) {
      res.json(result);
    } else {

      res.status(404).json({ message: `Post with id ${postId} not found` });
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Could not fetch this Post"
    );
  }
});

const findPostsByUser = catchAsync(async (req, res) => {
  try {
    const {userId } = req.params;
    const result = await PostServiceInstance.findForUser(userId);
    if (result.length) {
      res.json(result);
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "No Posts found for the user");
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Could not fetch Posts of the user"
    );
  }
});



const getAllPosts = catchAsync(async (req, res) => {
  try {
    const PostRes = await PostServiceInstance.findAll();
    if (PostRes.length) {
      res.json(PostRes);
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "No Posts found");
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error fetching Posts"
    );
  }
});

const createNewPost = catchAsync(async (req, res) => {
  try {
    const result = await PostServiceInstance.create(req.body, req.user._id);
    res.json(result);
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create new Post"
    );
  }
});

const addNewComment = catchAsync(async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await PostServiceInstance.addComment(req.body, postId);
    res.json(result);
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to add comment to this Post"
    );
  }
});

const deletePost = catchAsync(async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await PostServiceInstance.delete(postId);
    res.json(result);
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to delete this Post"
    );
  }
});

const updatePost = catchAsync(async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await PostServiceInstance.update(postId, req.body);
    res.json(result);
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to update this Post"
    );
  }
});

const addLikePost = catchAsync(async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await PostServiceInstance.addLike(postId, req.body.userId);
    res.json(result);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to add like");
  }
});

const removePostLike = catchAsync(async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await PostServiceInstance.removeLike(postId, req.body.userId);
    res.json(result);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to dislike");
  }
});

module.exports = {
  findPostById,
  findPostsByUser,
  createNewPost,
  getAllPosts,
  addNewComment,
  deletePost,
  updatePost,
  addLikePost,
  removePostLike,
};
