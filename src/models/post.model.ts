import mongoose from "mongoose";
import { Post } from "../types/post.interface.js";
const { Schema, model, Types } = mongoose;

const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema, "posts");
