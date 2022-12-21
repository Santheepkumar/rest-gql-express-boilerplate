import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express, { Response, Request } from "express";
import resolvers from "./gql/resolvers.js";
import typeDefs from "./gql/typeDefs.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
await server.start();

const app = express();

app.use("/api", (req: Request, res: Response) => {
  res.json({ api: true });
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(
    `🚀 Graphql Server ready at http://localhost:4000${server.graphqlPath}`
  );
  console.log(`🚀 Rest Server ready at http://localhost:4000/api`);
});
