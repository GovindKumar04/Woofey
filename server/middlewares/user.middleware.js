import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifyUser = asyncHandler(async(req,res, next) => {
    const token = req.cookies?.accessToken

    if(!token) throw new ApiError(401, "No logged in user exist")

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken._id);

    if(!user) throw new ApiError(401, "there is no autohrized user found")
    req.user=user;
    next();

})