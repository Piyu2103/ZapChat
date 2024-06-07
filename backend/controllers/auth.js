import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/AppError.js";

export const SignUp = async (req, res, next) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return next(new AppError(`Password don't match!`, 400));
    }
    const user = await User.findOne({ userName });
    if (user) {
      return next(new AppError(`Username already exists!`, 400));
    }

    const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture: gender === "male" ? boyAvatar : girlAvatar,
    });
    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      return next(new AppError(`Invalid User Data`, 400));
    }
  } catch (error) {
    console.log("Error while signing up", error);
    return next(new AppError(`Internal Server Error`, 500));
  }
};
export const Login = (req, res) => {
  console.log("Login User");
};
export const Logout = (req, res) => {
  console.log("Logout User");
};
