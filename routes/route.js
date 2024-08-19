import express from "express";

import {
  createPost,
  deletePost,
  getPost,
  getAllPosts,
} from "../controller/post.controller.js";
import {
  newComment,
  getComments,
  deleteComment,
} from "../controller/comment.controller.js";

import { upload } from "../authentication/multer.js";

const router = express.Router();

router
  .route("/create")
  .get(getAllPosts)
  .post(
    upload.fields([
      {
        name: "banner",
        maxCount: 1,
      },
    ]),
    createPost
  );
router.delete("/delete/:id", deletePost);

router.get("/post/:id", getPost);
router.get("/posts", getAllPosts);

router.route("/create").get(getComments).post(createPost);

router.post("/comment/new", newComment);
router.get("/comments/:id", getComments);
router.delete("/comment/delete/:id", deleteComment);

export default router;
