import axios from "axios";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { ApiError } from "../utils/apiError.utils.js";
let count;
const homepage = async (req, res) => {
  const { location } = req.body;
  const { user, loggedin } = req;

  if (location === "") {
    throw new ApiError(404, "please enter location");
    return res
      .status(404)
      .json(new ApiResponse(404, "sorry location is empty"));
  }
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`
    );
    const send = response.data;
    if (user) {
      send.usernname = user.name;
      send.email = user.email;
    }

    // const response2= await axios(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`)


    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          loggedin,
          send,
          "successfully data of weather is fetched and send to the user",
          "success"
        )
      );
  } catch (error) {
    console.log("error during api calling", error);
  }
};

const homepage1 = async (req, res) => {
  const { lat, lon } = req.body.params;
  const { user,loggedin } = req;

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution`,
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API_KEY,
        },
      }
    );
    const send = response.data;
    if (user) {
      send.usernname = user.name;}
    // const aqiindex = send.data.list[0].main.aqi
    // send.data.list[0].main.aqi = sky[aqiindex];
    // console.log(send.data.list[0])
    return res
      .status(200)
      .json(new ApiResponse(200, loggedin, send, "success"));
  } catch (error) {
    console.log(`error during data fectched polllution `, error);
  }
};
/*
const fetchusinglatlon = async (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    );
    console.log(`data  received from latlon of weather ${response.data}`);
    return res
      .status(200)
      .json(new ApiResponse(200, response.data, "Success fully received data"));
  } catch (error) {
    console.log(`error during fetching data of weather using latlon ${error}`);
  }
};
*/

const fetchusinglatlon = async (req, res) => {
  const { lat, lon } = req.body.params; // Destructuring directly in function parameter
  const { user,loggedin } = req;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API_KEY,
        },
      }
    );

    const send = response.data;
    if (user) {
      send.usernname = user.name;}
    // Sending the response to the client
    return res
      .status(200)
      .json(new ApiResponse(200, loggedin, send, "Successfully received data"));
  } catch (error) {
    console.error(`Error during fetching data of weather using latlon`, error);

    // Handling errors and sending an error response
    return res.status(500).json({
      status: 500,
      message: "Error fetching weather data",
    });
  }
};

export { homepage, homepage1, fetchusinglatlon };
