import axios from 'axios'
import { useUCP } from '../Context/Context';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Forgetpassword from './Forgetpassword';
function Loginpage() {

    const { setloggedin, res, setres } = useUCP();
    const [email, setemail] = useState('');
    const [password, setpass] = useState('');

    const navigate = useNavigate();
    async function Loginmethod(e) {
        e.preventDefault();
        const option = `http://localhost:3000/api-1/userlogin`;
        const details = {
            params: {
                email,
                password,
            }
        }

        try {


            await axios.post(option, details, {
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

                .catch((err) => {
                    console.log(`errror is ${err}`)
                });



        } catch (error) {
            console.log(`error from user login :`, error);
        }
    }

    async function login() {
        const option = `http://localhost:3000/api-1/userlogin`;
        const details = {
            params: {
                email,
                password,
            }
        }

        try {

            await axios.post(option, details, {
                withCredentials: true
            })
                .then((response) => {
                    if (response) {
                        setres(response.data)

                    } else {
                        setres(response.data);

                    }
                })

                .catch((err) => {
                    console.log(`errror is ${err}`)
                });



        } catch (error) {
            console.log(`error from user login :`, error);
        }
    }

    async function signup() {

        navigate('/signup')
    }

    function toforget(){
        navigate('/forgetpassword')
    }
function navi (){
    navigate('/')
}

    useEffect(() => {

        login();
    }
        , [])


    useEffect(() => {
        if (res.statusCode == 200) {
            setloggedin(res.loggedin);
            console.log('user logged in', res);

        }

    }, [res])


    return (

        <div className=' relative bg-white bg-opacity-60 border-2 text-white border-gray-300 rounded-lg w-3/12 mx-auto h-3/4 mt-24 items-center  flex-col justify-center'>
                    <button type="submit" onClick={navi} className=' absolute top-3 left-5 w-3/24 mx-auto bg-black/40 text-white font-bold border-2    px-2 py-1 rounded-xl'>{"< back"}</button>

                <h1 className='w-full text-center mt-9 text-4xl font-bold text-redbtn'>Login</h1>
                <form onSubmit={Loginmethod} className='w-11/12 h-fit flex m-auto mt-6 flex-col items-center'>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        autoComplete="ok"
                        placeholder=' enter your Email'
                        id="email"
                        onChange={(e) => setemail(e.target.value)}
                        className='bg-black/10 h-10 text-white  m-2   text-center  w-4/6 rounded-2xl' // Changed margin to m-2
                    />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setpass(e.target.value)}
                        name="password"
                        placeholder='password'
                        id="password"
                        className='bg-black/10  h-10  text-center  w-4/6 mt-2 rounded-2xl' // Changed margin to m-2
                    />

                    <button type="submit" className=' mt-6 mb-2 bg-redbtn  text-white/90 font-bold border-2   px-5 py-1 rounded-xl'>Log In</button>
                    <h6 onClick={toforget} className='text-sm underline mb-2 text-blue-800'>forget password !</h6>

                </form>
                <div className='w-full h-fit flex  flex-col justify-center'>
                    <h1 className='w-full text-center'>or</h1>
                    <div className='text-2xl w-1/2  relative mx-auto inline-block justify-center flex mb-5 text-bold'><h1 className=' rounded-xl  pl-2 pr-2 z-10'></h1>
                        <p className=' absolute bottom-1/3 h-px bg-black  left-0 w-full'></p>
                    </div>
                    <button type="submit" onClick={signup} className=' m-3 bg-redbtn w-3/24 mx-auto text-white/90 font-bold border-2    px-5 py-1 rounded-xl'>SignUp</button>

                </div> 
            
        </div>


    )
}

export default Loginpage
