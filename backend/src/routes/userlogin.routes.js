import {Router} from "express"
import { Userlogin } from "../controllers/userlogin.controllers.js";
const route2 = Router();

route2.route("/userlogin").post(Userlogin);

export {route2}