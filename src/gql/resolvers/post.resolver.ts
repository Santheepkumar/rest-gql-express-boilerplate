// import Post from "../../model/post.model.js";

const postResolver = {
  Query: {
    /**
     * @DESC to Get all the Posts
     * @Access Public
     */
    getAllPosts: async (_, {}, { Post }) => {
      let posts = await Post.find().populate("author");
      return posts;
    },
    /**
     * @DESC to Get single the Post by ID
     * @Access Public
     */
    getPostById: async (_, { id }, { Post }) => {
      let post = await Post.findById(id);
      return post;
    },
  },
  Mutation: {
    /**
         * @DESC to Create new Post
         * @Params newPost{ 
                title!, 
                content!, 
                featuredImage 
            }
         * @Access Private
         */
    createPost: async (_, { newPost }, { Post }) => {
      // Once the Validations are passed Create New Post
      const post = new Post({
        ...newPost,
      });
      // Save the post
      let result = await post.save();
      result = {
        ...result.toObject(),
        id: result._id.toString(),
      };
      return result;
    },
    /**
         * @DESC to Update an Existing Post by ID
         * @Params updatedPost { 
                title!, 
                content!, 
                featuredImage 
            }
         * @Access Private
         */
    updatePost: async (_, { updatedPost, id }, { Post }) => {
      try {
        let post = await Post.findOneAndUpdate(
          {
            _id: id,
          },
          updatedPost,
          {
            new: true,
          }
        );

        return post;
      } catch (err) {
        throw new Error(err.message);
      }
    },
    /**
     * @DESC to Delete an Existing Post by ID
     * @Params id!
     * @Access Private
     */
    deletePost: async (_, { id }, { Post }) => {
      try {
        let post = await Post.findOneAndDelete({
          _id: id,
        });
        return {
          success: true,
          message: "Post Deleted Successfully.",
        };
      } catch (err) {
        // throw new GraphQLError(message, {
        //   extensions: { code: "", myCustomExtensions },
        // });
        throw new Error(err.message);
      }
    },
  },
};
export default postResolver;
