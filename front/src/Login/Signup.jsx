import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUCP } from '../Context/Context'
import { useNavigate } from 'react-router-dom'


function Signup() {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const { setloggedin } = useUCP();
    const [res, setres] = useState();
    const [name, setname] = useState()
    const navigate = useNavigate();
    async function SignupMethod(e) {
        e.preventDefault();
        const url = `http://localhost:3000/api-1/usersingup`;
        const option = {
            params: {
                email,
                name,
                password
            }
        }
        if ((email && name && password)) {
            try {
                await axios.post(url, option, {
                    withCredentials: true
                })
                    .then((response) => {
                        if (response) {
                            setres(response.data);

                            console.log(response.data, 'from method if ');
                        } else {
                            setres(response.data);
                            console.log(response.data, ' from method else')
                        }
                    })
            } catch (error) {
                console.log(`eror from catch ,${error}`)
            }
        }

    }

    function navi() {
        navigate('/')
    }
    useEffect(() => {

        if (res) {
            setloggedin(true);
            navigate('/')
        }
    }, [res])
    return (
        <div className='w-full  h-5/6'>
            <div className='  bg-white relative bg-opacity-60 border-2 border-gray-300 rounded-lg w-3/12 mx-auto h-3/4 mt-24 items-center  flex-col justify-center'>
                <button type="submit" onClick={navi} className=' absolute top-3 left-5 w-3/24 mx-auto bg-black/40 text-white font-bold border-2    px-2 py-1 rounded-xl'>{"< back"}</button>


                <h1 className='w-full text-center mt-9 text-4xl font-bold text-redbtn'>Signup</h1>

                <form onSubmit={SignupMethod} className='w-11/12 h-fit flex m-auto pt-6 flex-col items-center'>
                    {!res ? <>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            name="name"
                            placeholder='name'
                            id="name"
                            className='bg-black/10 h-10 border-px text-center  border-gray-400 w-4/6 m-2 rounded-2xl' // Changed margin to m-2
                        />

                        <input
                            type="email"
                            name="email"
                            value={email}
                            autoComplete="ok"
                            placeholder=' enter your Email'
                            id="email"
                            onChange={(e) => setemail(e.target.value)}
                            className='bg-black/10 h-10 border-px text-center  border-gray-400 w-4/6 m-2 rounded-2xl' // Changed margin to m-2
                        />


                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            name="password"
                            placeholder='password'
                            id="password"
                            className='bg-black/10  h-10 border-px text-center  border-gray-400 w-4/6 mt-2 rounded-2xl' // Changed margin to m-2
                        />

                        <button type="submit" className='mt-6 mb-4 bg-redbtn  text-white font-bold border-2   px-5 py-1 rounded-xl'>SignUp</button>

                    </> :
                        <h1 className=' text-2xl text-black mx-auto w-fit'>Loading...</h1>
                    }
                </form>


            </div>
        </div>
    )
}

export default Signup
