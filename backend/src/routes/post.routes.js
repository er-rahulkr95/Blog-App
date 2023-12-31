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


const { validateSchema,isPostPresent} = require("../middlewares");


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
router.get("/user/:userId", authenticateToken, findPostsByUser);
router.get("/id/:postId", findPostById);

router.patch("/id/:postId", authenticateToken, updatePost);
router.delete("/id/:postId", authenticateToken, deletePost);

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
