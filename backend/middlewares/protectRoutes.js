import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new AppError(`Unauthorized - No Token Provided`, 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new AppError(`Unauthorized - Invalid Token`, 401));
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new AppError(`User not found`, 404));
    }

    req.user=user;

    next();
  } catch (error) {
    return next(new AppError(`Internal Server Error`, 500));
  }
};

export default protectRoute;
