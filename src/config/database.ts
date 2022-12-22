import mongoose from "mongoose";
import { connectionString } from "./env.js";

mongoose.connect(connectionString as string);
mongoose.set("debug", true);

mongoose.connection.on("error", (err) => {
  throw new Error("Mongo connection failed");
});

function close() {
  mongoose.disconnect();
}

export { close, mongoose };

export default mongoose;
