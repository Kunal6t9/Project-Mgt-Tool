import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../features/auth/user.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decoded.id);

  if (!user || user.lastPasswordChange > new Date(decoded.iat * 1000)) {
    return next(new ErrorHandler("Token is invalid or has expired.", 401));
  }

  req.user = user;
  next();
});
