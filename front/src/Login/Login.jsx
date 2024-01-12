import Loginres from './loginres';
import Loginpage from './loginpage';
import { useUCP } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { loggedin, res } = useUCP();



  return (
    <div className='w-full  h-5/6 '>
      {!loggedin ?
        <Loginpage /> : <Loginres />
      }



    </div>

  )
}

export default Login
