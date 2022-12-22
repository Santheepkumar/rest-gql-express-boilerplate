const postTypedef = `#graphql
    type Query {
        getAllPosts: [Post!]!
        getPostById(id: ID!): Post!
    }

    type Mutation {
        createPost(newPost: PostInput): Post!
        deletePost(id: ID!): PostMessageResponse!
        updatePost(updatedPost: PostInput, id: ID!): Post!
    }

    type Post {
        title: String
        description: String
    }

    input PostInput {
        title: String
        description: String
    }
    type PostMessageResponse {
        message: String!
        success: Boolean
    }
`;

export default postTypedef;
