// import Post from "../../model/post.model.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../../actions/post.action.js";

const postResolver = {
  Query: {
    /**
     * @DESC to Get all the Posts
     * @Access Public
     */
    getAllPosts: async () => await getAllPosts(),

    /**
     * @DESC to Get single the Post by ID
     * @Access Public
     */
    getPostById: async (_, { id }) => await getPostById(id),
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
    createPost: async (_, { newPost }) => await createPost(newPost),
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
        return await updatePost(id, updatedPost);
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
        return await deletePost(id);
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
