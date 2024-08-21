import express from 'express'
const router = express.Router();

// controllers Import :
import  {signUp,signIn}  from '../controller/User.controller.js';
import { authForUser,isClient,isAdmin } from '../middleware/authMiddleware.js';
import { createPost } from '../controller/post.controller.js';
import { newComment } from '../controller/comment.controller.js';


// routes 
router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.post('/post/create',authForUser,isAdmin,createPost)
router.post('/post/comment/create',authForUser,newComment)









export default router;