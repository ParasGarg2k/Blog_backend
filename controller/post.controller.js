import Post from "../model/post.js";
import { destroyCloudImage, uploadOnCloudinary } from "../utils/upload.js";

export const createPost = async (req, response) => {
  try {
    console.log(req.body);
    const { title, description, username } = req.body;
    if (!(title && description && username)) {
      response
        .status(500)
        .json("Please provide username , title and description");
    }
    console.log(req.files);
    const imageLocalPath = req.files?.banner[0]?.path;
    if (!imageLocalPath) {
      response.status(500).json("Please provide image");
    }
    console.log("upload call");
    const image = await uploadOnCloudinary(imageLocalPath);
    console.log("upload ret");
    Post.create({
      title,
      description,
      username,
      banner: {
        url: image.secure_url,
        public_id: image.public_id,
      },
    });
    response.status(201).json("Post Published Successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    console.log(post);

    await post.findByIdAndDelete(request.params);

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
    response.status(500).json(error);
  }
};

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
