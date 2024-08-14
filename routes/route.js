import express from 'express';

import { createPost, deletePost, getPost, getAllPosts } from '../controller/post.controller.js';
// import { uploadImage, getImage } from '../controller/image.controller.js';
// import { newComment, getComments, deleteComment } from '../controller/comment.controller.js';

// import upload from '../utils/upload.js';

const router = express.Router();


router.post('/create', createPost);
router.delete('/delete/:id',  deletePost);

router.get('/post/:id', getPost);
router.get('/posts',  getAllPosts);

// router.post('/file/upload', upload.single('file'), uploadImage);
// router.get('/file/:filename', getImage);

// router.post('/comment/new', newComment);
// router.get('/comments/:id',  getComments);
// router.delete('/comment/delete/:id', deleteComment);

export default router;