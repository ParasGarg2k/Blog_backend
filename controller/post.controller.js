import post from '../model/post.js';
import user from '../model/user.js';


const createPost = async (req, res) => {
    const {id} = req.user;
    const {title,description,banner,username,categories} = req.body;
    // validation (paras)
    try {
        const createdPost = await post.create({
            title,
            description,
            banner,
            username,
            userId:id
        })
        const addPostToUser = await user.findOneAndUpdate({_id:id},{$push:{post:createdPost._id}},{new:true}).populate('post')
        return res.status(200).json({
            success:true,
            post:createdPost,
            message:"Post created successfully !",
            updatedUser:addPostToUser
        })
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:'Faild to create post'
            }
        );
    }
}

// export const deletePost = async (request, response) => {
//     try {
//         const post = await Post.findById(request.params.id);
        
//         await post.delete()

    response.status(200).json("post deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getAllPosts = async (request, response) => {
  let category = request.query.category;
  let posts;
  try {
    if (category) posts = await Post.find({ categories: category });
    else posts = await Post.find({});

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};
