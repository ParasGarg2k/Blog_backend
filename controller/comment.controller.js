import Comment from "../model/comment.js";

export const newComment = async (req, res) => {
  try {
    console.log(req.body);
    const { postId } = req.body;
    const { name, comments } = req.body;
    if (!(name && postId && comments)) {
      response.status(500).json("name, postId,comments");
    }

    Comment.create({
      name,
      postId: postId,
      comments,
    });

    res.status(200).json("Comment saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

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
