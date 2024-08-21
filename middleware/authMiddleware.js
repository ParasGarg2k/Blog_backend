import jwt from 'jsonwebtoken'

const authForUser = async(req,res,next)=>{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if(token == null)
        {
            return res.status(401).json({
                success:false,
                message:"No access token found"
            })
        }
        jwt.verify(token,process.env.Json_SECRET_TOKEN  ,(err,user)=>{
            if(err){
              return res.status(403).json({success:false,error:"Access token is invalid"})
            }
            req.user = user
            next();
          })
}

const isClient = async(req,res,next)=>{
    try{
        if(req.user.role.toLowerCase() !== "client")
        {
            return res.status(401).json({
                success:false,
                message:"This is protected route for clients only"
            })
        }
        next();
    }catch(err)
    {
        return res.status(500).json({
            success:false,
             message:"User role cannot be verified"
        })
    }
}

const isAdmin = async(req,res,next)=>{
    try{
        if(req.user.role.toLowerCase() !== "admin")
        {
            return res.status(401).json({
                success:false,
                message:"This is proctected route for admin only"
            })
        }
        next();
    }
    catch(err)
    {
        return res.status.json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}

export {isAdmin,isClient,authForUser}