const express = express();
const router = express.router();
const post = require('../model/post')
// controllers Import :




// routes 
router.post('/sign-up',async(req,res)=>{
    const {username,password,name,email} = req.body;
    if(!username || !password || !name || !email)
    {
        return res.status(400).json({
            success:false,
            message:"Some fields are empty !"
        })
    }
    if(username && username.length < 3)
    {
        return res.status(403).json({
            success:false,
            message:"Name must contain atleast 3 characters"
        })
    } 
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return res.status(403).json({
            success:false,
            message:"Invalid Email"
        })
    }
    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password))
    {
        return res.status(403).json({
            success:false,
             message:"Password must contain at least 1 lowercase, 1 uppercase, and 1 digit"
        })
    }
})


router.post('/post/create',authVerify,async(req,res)=>{
    const {title,description,banner,username,tag} = req.body;
    const User = req.user;
    const Post = post.create({
        title:title,
        description:description,
        banner:banner,
        username:username
    })
    
})












module.exports = router