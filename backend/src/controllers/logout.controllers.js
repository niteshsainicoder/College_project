import { ApiResponse } from "../utils/apiResponse.utils.js";
import { WeatherUser } from "../models/user.models.js";
const logoutuser = async (req, res) => {
  let { loggedin } = req;
  console.log(loggedin)
  if (!loggedin) {
    return res
      .status(200)
      .json(new ApiResponse(300, false,`please login first and then try`, "success"));
  }
  await WeatherUser.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  ).then(()=>{loggedin=false});

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accesstoken", options)
    .clearCookie("refreshtoken", options)
    .json(new ApiResponse(200, loggedin,'user successfullt loged out', "User logged Out"));
};
export { logoutuser };
