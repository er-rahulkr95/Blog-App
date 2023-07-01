const router = require("express").Router();
const {
  findPostById,
  findPostsByUser,
  createNewPost,
  getAllPosts,
  addNewComment,
  deletePost,
  updatePost,
  addLikePost,
  removePostLike,
} = require("../controllers");

const {postValidationSchema,commentValidationSchema} = require("../validations");


const { validateSchema,isPostPresent,verifyAuthor} = require("../middlewares");


const passport = require("passport");
const authenticateToken = passport.authenticate("jwt", { session: false });

const validatePost = validateSchema(postValidationSchema);
const validateComment = validateSchema(commentValidationSchema);

router.post(
  "/new",
  authenticateToken,
  validatePost,
  createNewPost
);
router.get("/all", getAllPosts);
router.get("/user/:userId", findPostsByUser);
router.get("/id/:postId", findPostById);

router.patch("/id/:postId", authenticateToken,verifyAuthor, updatePost);
router.delete("/id/:postId", authenticateToken,verifyAuthor, deletePost);

router.put(
  "/:postId/comment",
  authenticateToken,
  isPostPresent,
  validateComment,
  addNewComment
);

router.put("/:postId/like",authenticateToken, addLikePost)
router.put("/:postId/disLike",authenticateToken, removePostLike)

module.exports = router;
