import Comment from '../model/comment.js';
import Post from '../model/post.js';

export const newComment = async (req, res) => {
  const {comment,postId,username} = req.body;

    console.log(comment,postId,username)
    if(!postId|| !comment)
    {
        return res.status(401).json({
            success:false,
            message:"Some fields found to be empty"
        })
    }
    try{
        const {id} = req.user;
        const commentAdded = await Comment.create({
            username,
            postId,
            comment,
            userId:id
        })
        const postDetail = await Post.findByIdAndUpdate({_id:postId},{$push:{comments:commentAdded._id}}).populate('comments').exec();
        return res.status(200).json({
            success:true,
            message:"comment added to the post",
            postDetail
        })
    }catch(err)
    {
        return res.status(400).json({
            success:false,
            message:"Error at comment",
            error:err.message
        })
    }
}


export const getComments = async (request, response) => {
  try {
    const comments = await Comment.find({ postId: request.params.id });

    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteComment = async (req, response) => {
  try {
    const { commentId } = req.params.id;

    if (!isValidObjectId(commentId)) {
      throw new ApiError(400, "Invalid comment ID");
    }

    await Comment.findByIdAndDelete({ _id: commentId });

    response.status(200).json("comment deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
