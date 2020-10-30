const { ApolloServer } = require("apollo-server");
const { gql } = require("apollo-server");
const mongoose = require("mongoose");

const Post = require("./models/Post");
const { MONGODB } = require("./config");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
  }

  type Query {
    getPost: [Post]
  }
`;

const resolvers = {
  Query: {
    getPost: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log(`connected to database `);
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server running at port ${res.url}`));
