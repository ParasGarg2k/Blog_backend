import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: false,
  },
  username: {
      type: String,
      required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      // required:true,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "like",
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const post = mongoose.model("post", PostSchema);

export default post;
