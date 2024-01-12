import { WeatherUser } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";

const Usersignup = async (req, res) => {
  const { name, email, password } = req.body.params;

  if (!(name && password && email)) {
    res.json(
      new ApiResponse(400, false, "Name , Email And Password is neccessary . ")
    );
  }
  const presentuser = await WeatherUser.findOne({ email });
  if (presentuser) {
    return res.json(
      new ApiResponse(
        200,
        false,
        "the user is present .Please chaneg the email",
        "success"
      )
    );
  }
  const newuser = await WeatherUser.create({ name, email, password });

  if (newuser) {
    try {
      const Token = newuser.generateaccesstoken();
      const Token2 = newuser.generaterefreshtoken();

      newuser.accesstoken = Token;
      2;
      newuser.refreshtoken = Token;
      await newuser.save();
      console.log("ok");
      res
        .cookie("accesstoken", Token, { maxAge: 9000000, httpOnly: true })
        .cookie("refreshtoken", Token2, { maxAge: 9000000, httpOnly: true });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("not ok");
  }
  const user = await WeatherUser.findById({ _id: newuser._id }).select(
    "-password -refreshtoken -accesstoken"
  );
  return res.json(new ApiResponse(200, true, user, "success"));
};

export { Usersignup };
