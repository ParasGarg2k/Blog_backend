import { Like } from "../model/like.js";
import Post from "../model/post.js";

export const togglepostLike = async (req, res) => {
  const { postId, username } = req.body;
  console.log(postId, username);

  if (!postId) {
    return res.status(401).json({
      success: false,
      message: "Some fields found to be empty",
    });
  }

  try {
    if (!isValidObjectId(postId)) {
      return res.status(401).json({
        success:false,
        message:"Invalid postid."
    })
    }

    const { id } = req.user;
    const alreadyLiked = Post.likes.find(
      (like) => like.toString() === id.toString()
    );

    if (alreadyLiked) {
      const postDetail = await Post.findByIdAndUpdate(
        { _id: postId },
        { $pull: { likes: alreadyLiked._id } }
      ).populate("likes").exec();

      return res.status(200).json({
        success: true,
        message: "like removed from the post",
        postDetail,
      });

    }

    const likeAdded = await Like.create({
      username,
      postId,
      userId: id,
    });

    const postDetail = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { likes: likeAdded._id } }
    ).populate("likes").exec();

    return res.status(200).json({
      success: true,
      message: "like added to the post",
      postDetail,
    });

  } 
  catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error at like",
      error: err.message,
    });
  }
};
