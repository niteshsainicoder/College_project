import { ApiResponse } from "../utils/apiResponse.utils";
import { WeatherUser } from "../models/user.models";

const changepassword = async () => {
  const { user, loggedin } = req;
  const { oldpassowrd, name } = req.body.params;
  if (!loggedin) {
    return res.json(
      new ApiResponse(200, loggedin, "not logged in to logout", "success")
    );
  }
  if (!(oldpassowrd && newpassword)) {
    return res.json(
      new ApiResponse(
        200,
        loggedin,
        "PLease enter the both passowrd",
        "success"
      )
    );
  }
  if (oldpassowrd === newpassword) {
    return res.json(
      new ApiResponse(
        200,
        loggedin,
        "PLease enter the both passowrd diffrent",
        "success"
      )
    );
  }
  const User = await WeatherUser.findById({ _id: user._id });
  if (!User) {
    return res.json(
      new ApiResponse(200, loggedin, "User  is not found", "success")
    );
  }

  if (!(oldpassowrd === User.password)) {
    return res.json(
      new ApiResponse(
        200,
        loggedin,
        "Old password is not matched or wrong",
        "success"
      )
    );
  }

  User.password = newpassword;
  const wait = await User.save();
  if (!wait) {
    return res
      .status(200)
      .json(new ApiResponse(200, loggedin, "somthing error ", "success"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, loggedin, "Your password is changed ", "success")
    );
};

export { changepassword };
