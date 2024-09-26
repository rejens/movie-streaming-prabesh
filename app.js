import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//importing routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//importing database
import connectDB from "./config/database.js";

//importing error handler middleware
import errorHandler from "./middleware/errorHandler.js";

//middlewares
const app = express();
app.use(cors());
app.use(express.json());

//configuring dotenv
dotenv.config();

connectDB();

//mounting routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

//listening to the port
app.listen(5000, () => {
   console.log("Server running on port 5000");
});
