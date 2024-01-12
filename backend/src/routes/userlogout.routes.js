import express from "express"
import { logoutuser } from "../controllers/logout.controllers.js"
import { verifyjwt } from "../middlewares/verifyjwt.middlwares.js";

const logoutroute = express.Router();

logoutroute.route("/logout").post( verifyjwt,logoutuser);


export {logoutroute};