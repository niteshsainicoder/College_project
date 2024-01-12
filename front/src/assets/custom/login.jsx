import React, { useState, useEffect } from 'react';

function Login() {
    const [login, setlogin] = useState(false)


    useEffect(() => { 


        

    })


    return (
        <>
            <div className='w-8/12 h-10/12 bg-slate-600 bg-opacity-5'>
                <form action="/userlogin" method="post">
                    <input type="email" name='username' max={20} size={15} placeholder='email ' />
                    <input type="text" name='passowrd' max={20} size={15} placeholder='password ' />
                    <button type="submit">LogIn</button>
                </form>
            </div>

        </>
    )



}

export { Login }