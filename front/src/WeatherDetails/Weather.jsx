
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUCP } from '../Context/Context';
import one from "../assets/images/01d.png"
import two from "../assets/images/02d.png"
import thr from "../assets/images/03d.png"
import f from "../assets/images/04d.png"
import n from "../assets/images/09d.png"
import t from "../assets/images/10d.png"
import e from "../assets/images/11d.png"
import th from "../assets/images/13d.png"
import fi from "../assets/images/50d.png"
import onen from "../assets/images/01n.png"
import twon from "../assets/images/02n.png"
import thrn from "../assets/images/03n.png"
import fn from "../assets/images/04n.png"
import nn from "../assets/images/09n.png"
import tn from "../assets/images/10d.png"
import en from "../assets/images/11n.png"
import thn from "../assets/images/13n.png"
import fin from "../assets/images/50n.png"
function Weather() {


    const { loggedin, setloggedin,setusername} = useUCP();
    const [weather, setweather] = useState("");
    const [location, setLocation] = useState("");
    const [pollution, setPollution] = useState();
    const [lat, setlat] = useState("");
    const [lon, setlon] = useState("");
    const [date, setdate] = useState();
    const [time, settime] = useState(true);
    const sky = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

    const imageMap = {
        '01d': one,
        '02d': two,
        '03d': thr,
        '04d': f,
        '09d': n,
        '10d': t,
        '11d': e,
        '13d': th,
        '50d': fi,
        '01n': onen,
        '02n': twon,
        '03n': thrn,
        '04n': fn,
        '09n': nn,
        '10n': tn,
        '11n': en,
        '13n': thn,
        '50n': fin,
    
    };
    const [icon, seticon] = useState();




    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Send coordinates to backend
                    const coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    setlat(coordinates.latitude)
                    setlon(coordinates.longitude)
                    setUserLocation(coordinates)
                    console.log(coordinates.latitude, coordinates.longitude)
                    // Send coordinates to your backend API
                },
                (error) => {
                    console.log(error)
                    // Handle errors (e.g., user denied permission)
                }
            );
        } else {
            console.log("nothing")
            // Geolocation not supported
        }
    };

    const fetchusinglatlon = async (lat, lon) => {
        try {
            const details = { params: { lat, lon } };
            const option = `http://localhost:3000/api-1/login/homepage/usinggeolocation`

            const response = await axios.post(option, details,{withCredentials:true});
            setweather(response.data)
            console.log(`response from fetchusinglatlon `, weather);

        }

        catch (error) {

            console.log(`error of fetchusinglatlon function :${error}`)
        }
    }



    const fetchPollutionData = async () => {

        const option = `http://localhost:3000/api-1/login/homepage/pollution`;
        try {
            const details = { params: { lat, lon } }
            const response = await axios.post(option, details
            );


            setPollution(response.data);
            console.log(`response  from fetchpollutiondata `, response.data)

        }
        catch (error) {
            console.log(`error  of fetchpollutiondata  function: ${error} `)
        }
    }

    const fetchWeatherData = async (details) => {

        const options = `http://localhost:3000/api-1/login/homepage/weather`;

        try {
            const response = await axios.post(options, details, {
                withCredentials: true
            });
            console.log(response.data);
            setweather(response.data);
            console.log(`response from fetchweatherdata `, weather)
        }
        catch (error) {
            console.log(` error of fetch weather data function :${error}`);
        }

    };


    //  useEffect(() => {


    //      fetchusinglatlon({ lat, lon })

    //  },
    //      [userLocation]

    //  )



    useEffect(() => {

        getUserLocation();
    }, [])


    useEffect(() => {

        if (lat !== "" && lon !== "") {
            const fetchData = async () => {
                await fetchusinglatlon(lat, lon);
                await fetchPollutionData();
            };

            const fetchDataTimeout = setTimeout(fetchData, 5000);

            return () => clearTimeout(fetchDataTimeout);
        }
    }, [lat, lon])

    useEffect(() => {

        if (location !== "") {
            const details = { location };
            const fetchWeatherTimeout = setTimeout(async () => {
                await fetchWeatherData(details);
            }, 1000);

            return () => clearTimeout(fetchWeatherTimeout);
        }
    },
        [location])

    useEffect(() => {
        if (weather && weather.data.coord) {
            setlon(weather.data.coord.lon)
            setlat(weather.data.coord.lat)
            if (weather.data.weather[0]) {
                const weatherCode = weather.data.weather[0].icon;
                seticon(imageMap[weatherCode] || null);
                const timestamp = weather.data.dt; // Your received timestamp

                // Create a new Date object with the timestamp multiplied by 1000 (to convert seconds to milliseconds)
                const date = new Date(timestamp * 1000);

                // Get the date separately
                setdate(date.toLocaleDateString()); // Date in YYYY-MM-DD format

                // Get the time separately
                settime(date.toLocaleTimeString())
            }
        }
        if (weather && weather.loggedin) {
            setloggedin(weather.loggedin)
            setusername(weather.data.username)
            console.log(weather.loggedin)
        }
        console.log(weather.loggedin)
        console.log(weather,"no bro")

        // console.log(weather.data.
        ;


    }, [weather])

    // useEffect(() => {
    //     if (lat && lon) {


    //         fetchPollutionData()
    //     }
    // }, [lat, lon])


    return (
        <div className=''>
            <div className="border relative bg-gray-400 brightness-120 overflow-hidden bg-opacity-60 border-black rounded-lg w-6/12 mx-auto h-3/4 mt-10 text-purple">
                <div className="px-4 sm:px-0  h-full" >
                    <div className='w-6/12 bg-white overflow-hidden rounded-2xl  h-12 flex overflow-hiddenflex justify-around m-auto mt-10'>
                        <div className=' h-13 w-11/12  hover:bg-blue-100'>
                            <input
                                type="text"
                                className="w-full text-center h-12 active:border-white-2 bg-white hover:bg-blue-100 ml-0 "
                                value={location || weather.name}
                                disabled={!loggedin}
                                placeholder={weather.name}
                                onChange={(e) => setLocation(e.target.value)}

                            />
                        </div>
                        <div className='w-1/12 border-l-2 h-full pl-1   hover:bg-blue-100 '>
                            <button onClick={fetchWeatherData} className=''>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/751/751381.png"
                                    className=" w-7 pt-3 pr-1"
                                    alt=""
                                />
                            </button>
                        </div>
                    </div>

                    <div className='w-full text-xl  h-full  ' >

                        <div id='header' className='h-40 w-full  flex justify-between  px-10'>
                            <div className='h-full w-1/2'>
                                <div className='text-3xl pt-8  text-blue-900 font-semibold '>{weather.data ? weather.data.name : "Loading...."}</div>
                                <div className='text-xl pt-5'> Temp : {weather.data ? Math.round(weather.data.main.temp - 273.15) : " "}  {weather.data ? weather.data.weather[0].main : "Loading...."}</div>
                            </div>
                            <div className=' h-40 w-1/2 '>
                                {icon && <img src={icon} className=" ml-20 h-40 w-40 p-5 text-transparent" alt=" sorry" />} {!weather && "Loading...."}
                            </div>
                        </div>


                        <div id='main ' className='h-28 w-full flex justify-between px-10'>
                            <div className='h-full w-1/2 pt-3'>
                                <div>Feels like : {weather.data ? Math.round(weather.data.main.feels_like - 273.15) : "Loading...."} </div>
                                <div className='flex pt-5'>  Humidity : {weather.data ? <>{weather.data.main.humidity} % <img src={fi} className=' pl-2 w-8 h-5  ' alt="" /> </> : "Loading...."}  </div>
                            </div>
                            <div className='h-full w-max pt-3'>
                                <div className='text-xl  mx-auto '>Air quality: {pollution ? sky[pollution.data.list[0].main.aqi] : "Loading...."}  </div>
                                <div className='pt-5  text-xl mx-auto '>Aqi: {pollution ? [pollution.data.list[0].main.aqi] : "Loading...."} </div>
                            </div>
                        </div>



                        <div id='footer' className='h-28 w-full flex justify-between  px-10'>
                            <div className='h-full w-1/2 pt-1'>
                                <div> visibility: {weather.data ? (weather.data.visibility / 1000) : "Loading.... "} km</div>

                                <div className='pt-5'>  Wind Speed : {weather ? (Math.round(weather.data.wind.speed * 3.6)) : "Loading...."} km/h     </div>
                            </div>
                            <div className='h-full w-max pr-10 pt-3'>
                                <div className=' text-xl mx-auto '> Day :  {date}    </div>
                                <div className='pt-5 text-xl mx-auto '>Time: {time}</div>
                            </div>


                        </div>


                    </div>
                </div>


            </div>
        </div>
    )
}

export default Weather
