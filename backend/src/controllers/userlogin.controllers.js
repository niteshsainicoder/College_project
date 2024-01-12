import { WeatherUser } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/apiResponse.utils.js";

const Userlogin = async (req, res) => {
  console.log(`controler are called`);
  const cookie = req.cookies.accesstoken;

  //it work when the cookie is not set or found
  if (!cookie) {
    const { email, password } = req.body.params;
    const userbyemail = await WeatherUser.findOne({ email });
    console.log({ email, password });
    if (!userbyemail) {
      console.log(`user not found from this ${email} , ${password}`);
      return res.json(new ApiResponse(300,false, `User not found with this email`, "failed"));
    }

    const pass = userbyemail.password;
    const login = await bcrypt.compare(password, pass);
    // it works when entered password is not matched
    if (!login) {
      console.log(` password is not matched`);
      return res.json(new ApiResponse(300, false,'use password is not matced', "failed"));
    }

    const token = userbyemail.generateaccesstoken();
    const token2 = userbyemail.generaterefreshtoken();
    userbyemail.accesstoken = token;
    await userbyemail.save();
    const user = await WeatherUser.findById(userbyemail._id).select(
      "-password -accesstoken -refreshtoken"
    );
    res.cookie("accesstoken", token, {
      maxAge: 9000000,
      secure: true,
      httpOnly: true,
    });
    res.cookie("refreshtoken", token2, { secure: true, httpOnly: true });
    console.log(`data is going to send to frontend,${user}`);
    return res.json(
      new ApiResponse(200, true ,user, "success login by email password")
    );
  }

  // it works when cookie found
  const checkjwt = jwt.verify(cookie, process.env.ACCESS_TOKEN_SECRET);
  const pass = checkjwt.password;
  const id = checkjwt._id;
  const check = await WeatherUser.find({ _id: id, password: pass });
  if (!check) {
    return res.json(new ApiResponse(300, "password is not matched"));
  }

  const user = await WeatherUser.findById(id).select(
    "-password -accesstoken -refreshtoken"
  );
  return res.json(new ApiResponse(200, true,user, "success login by cookie"));
};

export { Userlogin };
