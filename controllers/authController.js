import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc    Login user
// @route   POST /api/auth/login
export async function login(req, res, next) {
   const { email, password } = req.body;

   try {
      //fetch user data form database
      const user = await User.findOne({ email }).select("+password");

      // Check if user exists
      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
      }
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      // Create and sign JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({
         token,
         user: { id: user._id, email: user.email, type: user.userType },
      });
   } catch (err) {
      next(err);
   }
}

// @desc    Register a new user
// @route   POST /api/auth/register
export async function register(req, res, next) {
   try {
      const data = req.body;
      console.log(data);
      req.body.password = await bcrypt.hash(data.password, 10);
      const response = await User.create(req.body);
      res.status(201).json(response);
   } catch (err) {
      next(err);
   }
}
