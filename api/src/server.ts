import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

// mongoose
//   .connect(env.MONGO_CONNECTION_STRING!)
//   .then(() => {
//     console.log("Mongoose connected");
//     app.listen(port, () => {
//       console.log("Server running on port: " + port);
//     });
//   })
//   .catch(console.error);

const connect = async () => {
  try {
    await mongoose.connect(env.MONGO_CONNECTION_STRING);
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, () => {
  connect();
  console.log("Server running on port: " + port);
});
