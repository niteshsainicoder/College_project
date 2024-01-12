import {Router} from 'express'
import { verifyjwt } from "../middlewares/verifyjwt.middlwares.js";
import { forgetpassword } from '../controllers/forgetpassword.controllers.js';
const routeforpasschange = Router();

routeforpasschange.route("/login/forgetpassword").post(verifyjwt,forgetpassword);

export {routeforpasschange}