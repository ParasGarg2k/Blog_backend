import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const destroyCloudImage = async (localFilePath)=>{
    try{
        await cloudinary.uploader.destroy(localFilePath)
        return true
    }catch (error){
        return null
    }
}

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null

        if(localFilePath.fieldname === "coverImage"){
            const localPath = localFilePath.path;
            const response = await cloudinary.uploader.upload(localPath, {
                resource_type: "auto",
                    folder: "videoweb",
                    width: 150,
                    crop: "scale",
            })
            fs.unlinkSync(localFilePath.path);
            return response
        }
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
                    folder: "videoweb",
                    crop: "scale",
                
            })
        fs.unlinkSync(localFilePath);
        return response
    } catch(error){
        if(localFilePath.fieldname === "coverImage"){
        fs.unlinkSync(localFilePath.path) 
        }else{
            fs.unlinkSync(localFilePath)
        }
        return null
    }
}

export {uploadOnCloudinary, destroyCloudImage};