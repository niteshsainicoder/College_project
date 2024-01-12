import { NavLink } from 'react-router-dom'
import { useUCP } from '../Context/Context.js'
import axios from 'axios'
import { useEffect, useState } from 'react'
function Header() {
    const { loggedin, setloggedin } = useUCP()
    const [res, setres] = useState('');

    const Logout = async () => {
        const url = `http://localhost:3000/api-1/logout`
        const option = {}
        await axios.post(url, option, {
            withCredentials: true
        }).then((response) => {
            setres(response.data)
        }).catch((err) => { console.log(`error is :${err}`) })

    }

    useEffect(() => {
        if (res && res.statusCode == 200) {
            setloggedin(res.loggedin)
        }
        console.log(loggedin, `from useeffect hook from header`, res.loggedin)
    }, [res])

    return (
        <div className='w-scren  h-fit border-b-gray-500   bg-gray-200 bg-opacity-80 pt-2 pb-3 border-2  items-center  justify-around flex'>
            <div className=' w-6/12 h-full  text-3xl pl-44 font-bold'>Weather </div>

            <div className='w-6/12 h-full items-center  '>

                <nav>

                    <ul className="flex flex-col  text-xl font-medium lg:flex-row justify-end mr-32 lg:space-x-8 lg:mt-0">
                      
                        {loggedin ? <li>
                            <button onClick={Logout} className={({ onClick }) =>
                                `block py-2 pr-4 pl-3 duration-200 border-b ${onClick ? "text-orange-700" : "text-gray-700"} border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                            }
                            >
                                LogOut
                            </button>
                        </li> : <li>
                            <NavLink to={"/Login"} className={({ isActive }) => {
                                `block py - 2 pr - 4 pl - 3 duration - 200 border - b ${isActive ? "text-orange-700" : "text-gray-700"} border - gray - 100 hover: bg - gray - 50 lg: hover: bg - transparent lg: border - 0 hover: text - orange - 700 lg: p - 0`
                            }}>
                                LogIn
                            </NavLink>
                        </li>}
                    </ul>

                </nav>

            </div>
        </div>
    )
}
export default Header
