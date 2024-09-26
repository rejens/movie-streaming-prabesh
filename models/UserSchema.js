import { Schema, model } from "mongoose";

const UserSchema = new Schema(
   {
      email: { type: String, required: true },
      password: { type: String, required: true, select: false },
      paid: { type: String, enum: ["free", "delux", "hd"], default: "free" },
      userType: { type: String, default: "user" },
   },
   { timestamps: true }
);

const user = model("User", UserSchema);
export default user;
