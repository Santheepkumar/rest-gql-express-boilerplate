import { Post } from "../models/index.js";

const getAllPosts = async () => await Post.find();
const getPostById = async (id) => await Post.findById(id);
const createPost = async (newPost) => {
  const post = new Post({
    ...newPost,
  });
  let result: any = await post.save();
  result = {
    ...result.toObject(),
    id: result._id.toString(),
  };
  return result;
};
const updatePost = async (id, updatedPost) =>
  await Post.findOneAndUpdate(
    {
      _id: id,
    },
    updatedPost,
    {
      new: true,
    }
  );

const deletePost = async (id) => {
  const post = await Post.findOneAndDelete({
    _id: id,
  });
  if (!post) {
    throw new Error(`No post found with this id - ${id}`);
  }
  return {
    success: true,
    message: "Post Deleted Successfully.",
  };
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
