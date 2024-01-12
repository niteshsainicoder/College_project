// App.jsx
import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from '../Login/Login';
import Layout from '../Layout';
import Weather from '../WeatherDetails/Weather';
import Signup from '../Login/Signup';
import Forgetpassword from '../Login/Forgetpassword';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path="/" element={<Layout />}>

        <Route path="/" element={<Weather />} />
        <Route path="/login" element={<Login />} />


        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />


        {/* other routes/components */}
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
