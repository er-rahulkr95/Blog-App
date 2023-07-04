const PostService = require("../services/post.service");
const PostServiceInstance = new PostService();
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");


const isPostPresent = catchAsync(async (req, res, next) => {
  try {
    const { postId } = req.params;
    const postToUpdate = await PostServiceInstance.findWithId(postId);
    if (postToUpdate) {
      next();
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "Post not found")
    }
  } catch (error) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid Post id")
  }
});

module.exports = { isPostPresent };
