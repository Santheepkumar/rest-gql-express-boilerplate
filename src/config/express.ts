import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express, { Request, Response } from "express";
import cors from "cors";
import resolvers from "../gql/resolvers/index.js";
import typeDefs from "../gql/typedefs/index.js";
import * as models from "../models/index.js";
import "./database.js";

interface MyContext {
  token?: String;
}

const app = express();

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

await server.start();

app.use("/api", (req: Request, res: Response) => {
  res.json({ api: true });
});

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  express.raw(),
  express.urlencoded({ extended: true }),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token, ...models }),
  })
);

export default app;
