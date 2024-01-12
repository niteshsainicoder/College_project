import { ApiResponse } from "../utils/apiResponse.utils.js";
import { ApiError } from "../utils/apiError.utils.js";
import jwt from "jsonwebtoken";
import { WeatherUser } from "../models/user.models.js";
const verifyjwt = async (req, res, next) => {
  const token = req.cookies?.accesstoken;
  const token2 = req.cookies?.refreshtoken;

  // if acccess token is not availabe
  if (!token) {
    if (!token2) {
      req.user = {};
      req.loggedin = false;
      next();
      return;
      throw new ApiError(400, "Please login first then try to visit this page");
      console.log("400, Please login first then try to visit this page");
    }
    const verify = jwt.verify(token2, process.env.REFRESH_TOKEN_SECRET);
    if (!verify) {
      req.loggedin = false;
      req.user = {};
      next();
      return;
      throw new ApiError(404, "refresh token is not verified/used or expired");
      console.log("400 refresh token is not verified/used or expired");
    }
    const userid = verify._id;
    const user = await WeatherUser.findById(userid);

    const accesstoken1 = user.generateaccesstoken();
    const refreshtoken1 = user.generaterefreshtoken();
    user.accesstoken = accesstoken1;
    user.refreshtoken = refreshtoken1;
    await user.save();
    const option = { httpOnly: true, secure: true };
    res
      .cookie("accesstoken", accesstoken1, option)
      .cookie("refreshtoken", refreshtoken1, option);
    req.loggedin = true;
    req.user = user;
    next();
  }
  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //.select("-password ");
  if (!user) {
    throw new ApiError(404, "access token is not verified/used or expired");
  }

  req.loggedin = true;
  req.user = user;
  next();
};

export { verifyjwt };
