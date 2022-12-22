import { port } from "./config/env.js";
import app from "./config/express.js";

app.listen({ port }, () => {
  console.log(`🚀 Graphql Server ready at http://localhost:${port}/graphql`);
  console.log(`🚀 Rest Server ready at http://localhost:${port}/api`);
});
