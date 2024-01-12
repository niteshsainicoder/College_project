import { useEffect, useState } from 'react';
import { useUCP } from '../Context/Context'
import { useNavigate } from "react-router-dom";
function Loginres() {
    const { loggedin, res } = useUCP();
    const navigate = useNavigate();


    const [go, setgo] = useState(false)
    function goback() {
        setgo(true)
    }
    useEffect(() => {

        navigate('/');

    }, [go]);
{loggedin&&goback}

    return <>
        <div className='w-8/12 h-full bg-opacity-70 border-2 border-gray-300  flex flex-col items-center'>
            {loggedin ? <h1>Logged in </h1>
                : <div>  <h1> Email or password is wrong ! .</h1></div>
            }
        </div>
    </>
}

export default Loginres
