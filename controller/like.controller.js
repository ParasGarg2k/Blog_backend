import {Like} from "../model/like.js"

export const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID")
    }

    const like = await Like.findOne({ video: videoId, likedBy: req.user._id })
    
    if (like) {
        await like.deleteOne()
        return res.status(200).json(new ApiResponse(200, {}, "Like Removed Successfully"))
    }

    const likedVideo = await Like.create({ video: videoId, likedBy: req.user._id })

    return res.status(201).json(new ApiResponse(200, likedVideo, "Like Added Successfully"))

})


