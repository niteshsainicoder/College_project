/* eslint-disable no-undef */
import { Outlet } from "react-router-dom"
import Header from './Header/Header'
import { ContextProvider } from './Context/Context.js'
import { useState } from "react"


function Layout() {

  const [loggedin, setloggedin] = useState(false);
  const [res, setres] = useState({})

  

  return (
    <ContextProvider value={{ loggedin,setloggedin , res,setres  }}>
      <div className='w-screen h-screen'>
        <Header />
        <Outlet />
      </div>
    </ContextProvider>
  )
}

export default Layout
