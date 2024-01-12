import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Forgetpassword() {
    const [newpassword, setnewpass] = useState('');
    const [email, setemail] = useState('');
    const [name, setname] = useState('');



const navigate = useNavigate();

    async function changepassword(e) {
        e.preventDefault();
        const details = {
            params: {
                name, email, newpassword
            }
        }
        const option = `http://localhost:3000/api-1//login/forgetpassword`

        try {
            await axios.post(option, details, {
                withCredentials: true
            })
                .then((response) => {
                    if (response) {
                        console.log(response.data, 'from auto login if');
                        if (response.data.data =="password change") {
                            navigate("/")
                        }

                    } else {
                        // setres(response.data);
                        console.log(response.data, 'from auto login else');

                    }
                    console.log(`outside from your reach ${response.data}`)
                })

                .catch((err) => {
                    console.log(`errror is ${err}`)
                });

        } catch (error) {
            console.log(error)
        }
    }

    function navi (){
        navigate('/')
    }

    return (
         <div className='w-full  h-5/6'>
      
        <div className='  bg-white bg-opacity-60 border-2 relative border-gray-300 rounded-lg w-3/12 mx-auto h-3/4 mt-24 items-center  flex-col justify-center'>
        <button type="submit" onClick={navi} className=' absolute top-3 left-5 w-3/24  mx-auto bg-black/40 text-white font-bold border-2    px-2 py-1 rounded-xl'>{"< back"}</button>

<h1 className='w-full text-center mt-16 text-4xl font-bold text-redbtn'>Change Password</h1>
            <form onSubmit={changepassword} className='w-11/12 h-fit flex m-auto mt-6 flex-col items-center'>
                <input
                    type="text"
                    name="name"
                    value={name}
                    autoComplete="ok"
                    placeholder=' enter your name'
                    id="name"
                    onChange={(e) => setname(e.target.value)}
                    className='bg-black/10 h-10 border-px m-2  border-white  text-center  w-4/6 rounded-2xl' // Changed margin to m-2
                />

                <input
                    type="email"
                    name="email"
                    value={email}
                    autoComplete="ok"
                    placeholder=' enter your Email'
                    id="email"
                    onChange={(e) => setemail(e.target.value)}
                    className='bg-black/10 h-10 border-px m-2  border-white  text-center  w-4/6 rounded-2xl' // Changed margin to m-2
                />

                <input
                    type="text"
                    value={newpassword}
                    onChange={(e) => setnewpass(e.target.value)}
                    name="password"
                    placeholder='newpassword'
                    id="password"
                    className='bg-black/10  h-10 border-px text-center  border-gray-400 w-4/6 mt-2 rounded-2xl' // Changed margin to m-2
                />

                <button type="submit" className=' mt-6 mb-2 bg-redbtn  text-white font-bold border-2   px-5 py-1 rounded-xl'>Change</button>

            </form>
        </div>
        </div>
    )
}


export default Forgetpassword
