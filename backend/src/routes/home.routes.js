import express from "express"
import { fetchusinglatlon, homepage ,homepage1    } from "../controllers/home.controlllers.js";
import { verifyjwt } from "../middlewares/verifyjwt.middlwares.js";
import {forgetpassword} from '../controllers/forgetpassword.controllers.js'
import {Userlogin} from '../controllers/userlogin.controllers.js'
import {logoutuser}from '../controllers/logout.controllers.js'
import {Usersignup} from'../controllers/usersignup.controllers.js'
const homeroute = express.Router();

homeroute.route("/login/homepage/weather").post(verifyjwt,homepage);
homeroute.route("/login/homepage/pollution").post( verifyjwt,homepage1);
homeroute.route("/login/homepage/usinggeolocation").post(verifyjwt,fetchusinglatlon);
homeroute.route("/login/forgetpassword").post(verifyjwt,forgetpassword);
homeroute.route("/userlogin").post(Userlogin);
homeroute.route("/logout").post( verifyjwt,logoutuser);
homeroute.route('/usersingup').post( Usersignup);


export {homeroute};