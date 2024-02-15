import express from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/Book_route.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth_route.js";
mongoose
  .connect(
    `mongodb+srv://mittal277:${encodeURIComponent(
      "Vaibhav@1234"
    )}@bookstore.noqumwl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/books", bookRoute);
app.use("/api/auth", authRoute);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
