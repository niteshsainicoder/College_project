import express from "express"
import { fetchusinglatlon, homepage ,homepage1    } from "../controllers/home.controlllers.js";
import { verifyjwt } from "../middlewares/verifyjwt.middlwares.js";
const homeroute = express.Router();

homeroute.route("/login/homepage/weather").post(verifyjwt,homepage);
homeroute.route("/login/homepage/pollution").post( verifyjwt,homepage1);
homeroute.route("/login/homepage/usinggeolocation").post(verifyjwt,fetchusinglatlon);

export {homeroute};