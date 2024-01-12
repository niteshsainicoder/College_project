import dotenv from "dotenv"
dotenv.config();
import  express  from "express";
import cors from "cors"
import {  ConnectDb} from "./src/db/index.db.js";
import CookieParser from "cookie-parser";
import { route } from "./src/routes/usersignup.routes.js";
import { route2 } from "./src/routes/userlogin.routes.js";
import { homeroute } from "./src/routes/home.routes.js";
import { logoutroute } from "./src/routes/userlogout.routes.js";
import { routeforpasschange } from "./src/routes/forgetpassword.routes.js";
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(CookieParser());
app.use("/api-1",route);
app.use("/api-1",route2)
app.use("/api-1",homeroute)
app.use("/api-1",logoutroute)
app.use("/api-1",logoutroute)
app.use("/api-1",routeforpasschange)


app.listen(process.env.PORT , async ()=>{
    await ConnectDb();
    console.log(`server is running on  ${process.env.PORT}`)
})