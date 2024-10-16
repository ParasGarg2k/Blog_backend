import express from 'express'
const router = express.Router();

// controllers Import :
import  {signUp,signIn,deleteAccount}  from '../controller/User.controller.js';
import { authForUser,isClient,isAdmin } from '../middleware/authMiddleware.js';
import { createPost } from '../controller/post.controller.js';
import { newComment } from '../controller/comment.controller.js';
import { togglepostLike } from '../controller/like.controller.js';


// routes 
//users
router.post('/sign-up',signUp)
router.post('/sign-in',signIn)
router.post('/delete-account',authForUser,deleteAccount)

//posts
router.post('/post/create',authForUser,isAdmin,createPost)

//comments
router.post('/post/comment/create',authForUser,newComment)

//likes
router.post('/post/like',authForUser,togglepostLike)


export default router;