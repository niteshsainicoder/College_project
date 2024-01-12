import { ApiResponse } from "../utils/apiResponse.utils.js";
import { WeatherUser } from "../models/user.models.js";

const forgetpassword = async (req, res) => {
  const { name, email, newpassword } = req.body.params;
  const { user, loggedin } = req;

  if (!(name && email)) {
    return res
      .status(200)
      .json(new ApiResponse(200, loggedin, user, "success"));
  }
  const finduser = await WeatherUser.findOne({ $and: [{ email }, { name }] });
  console.log(finduser, "from finduser");
  if (!finduser) {
    return res
      .status(200)
      .json(new ApiResponse(200, loggedin, finduser, "success"));
  }
  if (newpassword === finduser.password) {
    return res
      .status(200)
      .json(new ApiResponse(200, loggedin, "don't use old password", "success"));
  }
  finduser.password = newpassword;
  const wait = await finduser.save();
  console.log(wait, "from saving changes");
  if (!wait) {
    return res
      .status(200)
      .json(new ApiResponse(200, loggedin, "somthing error ", "success"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, loggedin, "password change", "success"));
};

export { forgetpassword };
