import { Schema } from "mongoose";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const weatheruser = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  refreshtoken: { type: String },
  accesstoken:{type:String}
});


weatheruser.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await  bcrypt.hash(this.password, 10);
  next();
});

weatheruser.methods.generaterefreshtoken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

weatheruser.methods.generateaccesstoken = function () {
  return jwt.sign(
    {
      _id: this._id,
      password: this.password,
      name:this.name,
      email:this.email
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const WeatherUser = mongoose.model("WeatherUser", weatheruser);
