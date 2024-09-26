import User from "../models/UserSchema.js";

// @desc    Get all users
// @route   GET /api/users
export async function fetchAllUsers(req, res, next) {
   try {
      const users = await User.find({ userType: "user" });
      res.status(200).json(users);
   } catch (err) {
      next(err);
   }
}
