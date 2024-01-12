import express from "express"
const route = express.Router();
import { Usersignup } from "../controllers/usersignup.controllers.js";

route.route('/usersingup').post( Usersignup);

export {route};