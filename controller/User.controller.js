import dotenv from 'dotenv'
import user from '../model/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config();

// import post from '../model/post.js'
// Generate json-web-token

function createToken(User) {
    const userObj = User.toObject ? User.toObject() : User;
    const token = jwt.sign({ id: userObj._id,role:userObj.role }, process.env.JSON_SECRET_TOKEN,{
        expiresIn:"2h",
      });
    return { ...userObj, accessToken: token };
}

function verifyToken(token)
{
    const decode = jwt.verify(token,process.env.JSON_SECRET_TOKEN,(err,result)=>{
        if(err)
        {
            return {user:null,message:"invalid token"};
        }
        return {user:decode,message:"Details fetched successfully"}
    })
}

const signUp = async(req,res)=>{
    const {password,name,email} = req.body;
    if(!password || !name || !email)
    {
        return res.status(400).json({
            success:false,
            message:"Some fields are empty !"
        })
    }
    if(name && name.length < 3)
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
    try
    {
        const isUser = await user.findOne({email});
        if(isUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already existed !"
            })
        }        
        const hashedPassword = await bcrypt.hash(password,10)
        const User = await user.create({
            email,
            password:hashedPassword,
            name,
            username:email.split('@')[0],
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        })
        User.password = undefined;
        return res.status(200).json({
            success:true,
            user:User
        })
    }catch(err)
    {
        console.log("error caught on sign-up : "+ err.message);
        return res.status(500).json({
            success:false,
            message:"Error occured while creating \"User\" , Try again Later" 
        })
    }
}


const signIn = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(400).json({
            success:false,
            message:"Some fields are missing "
        })
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return res.status(403).json({
            success:false,
            message:"Invalid Email"
        })
    }
    try{
        const isUser = await user.findOne({email});
        if(!isUser) return res.status(404).json({
            success:false,
            message:'User Does not Exist , Create One First'
        })

        await bcrypt.compare(password,isUser.password,(err,result)=>{
            if(err)
            {
                console.log("error at comparing hashed Password : "+err.message)
                return res.status(500).json({
                    success:false,
                    message: "Internal server error",
                    error: "Error while comparing passwords",
                })
            }
            if(!result)
            {
                return res.status(403).json({
                    success: false,
                    message: "Incorrect password",
                  });
            }
            else
            {
                return res.status(200).json({
                    success:true,
                    message:"User is logged in successfully",
                    user:createToken(isUser)
                })
            }
        })

    }catch(err)
    {
        console.log("error caught on sign-in : "+ err.message);
        return res.status(500).json({
            success:false,
            message:"Error occured while Logging In \"User\" , Try again Later" 
        })  
    }
}

const deleteAccount = async(req,res)=>{
    const {token} = req.body;
    if(!token)
    {
        return res.status(401).json({
            success:false,
            message:'Token is Empty , or haven\'t sent correctly' 
        })
    }
    try
    {   
        const {user} = verifyToken(token);
        if(user === null)
        {
            return res.status(404).json({
                success:false,
                message:"Unable to delete Account , Try again Later",
                error:"faild to decode the token provided by user"
            })
        }
        await User.fin

    }catch(err)
    {

    }
}

export {signUp,signIn};