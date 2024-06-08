import User from "../models/user.js";
import { AppError } from "../utils/AppError.js";

export const getUsersForSidebar = async (req, res, next) => {
  try {
    const loginUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loginUserId } }).select("-password");
    res.status(200).json(allUsers)
  } catch (error) {
    console.log("Error while getting users for sidebar", error);
    return next(new AppError(`Internal Server Error`, 500));
  }
};
