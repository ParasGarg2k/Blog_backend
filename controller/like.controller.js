import {Like} from "../model/like.js"

export const togglepostLike = asyncHandler(async (req, res) => {
    const {postId} = req.params

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post ID")
    }

    const like = await Like.findOne({ post: postId, likedBy: req.user._id })
    
    if (like) {
        await like.deleteOne()
        return res.status(200).json(new ApiResponse(200, {}, "Like Removed Successfully"))
    }

    const likedpost = await Like.create({ post: postId, likedBy: req.user._id })

    return res.status(201).json(new ApiResponse(200, likedpost, "Like Added Successfully"))

})


