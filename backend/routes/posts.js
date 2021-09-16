const express = require("express");
const checkAuth = require("../middleware/check-auth");
const postsController = require("../controllers/posts");
const ExtractFile = require("../middleware/file");

const router = express.Router();

// this will handle post requests to the /api/posts endpoint
router.post("", checkAuth, ExtractFile, postsController.createPost);

router.put("/:postId", checkAuth, ExtractFile, postsController.updatePost);

router.get("", postsController.getAllPosts);

router.get("/:id", postsController.getPost);

router.delete("/:id", checkAuth, postsController.deletePost);

module.exports = router;
