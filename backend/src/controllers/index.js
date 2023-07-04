module.exports.postSignup = require("./auth.controller").postSignup
module.exports.postLogin = require("./auth.controller").postLogin
module.exports.postLogout = require("./auth.controller").postLogout



module.exports.findPostById = require("./post.controller").findPostById
module.exports.findPostsByUser = require("./post.controller").findPostsByUser
module.exports.createNewPost = require("./post.controller").createNewPost
module.exports.getAllPosts = require("./post.controller").getAllPosts
module.exports.addNewComment = require("./post.controller").addNewComment
module.exports.deletePost = require("./post.controller").deletePost
module.exports.updatePost = require("./post.controller").updatePost
module.exports.addLikePost = require("./post.controller").addLikePost
module.exports.removePostLike = require("./post.controller").removePostLike
