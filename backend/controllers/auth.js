import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/AppError.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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
      generateTokenAndSetCookie(newUser._id, res);
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
export const Login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user?.password || ""
      );
      if (!isPasswordCorrect) {
        return next(new AppError(`Please enter the correct password`, 400));
      }
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePicture: user.profilePicture,
      });
    } else {
      return next(new AppError(`User does not exist`, 400));
    }
  } catch (error) {
    console.log("Error while logging up", error);
    return next(new AppError(`Internal Server Error`, 500));
  }
};
export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error while logging out", error);
    return next(new AppError(`Internal Server Error`, 500));
  }
};
