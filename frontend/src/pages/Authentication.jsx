import { useState } from "react"
import Signup from "../components/Signup";
import Login from "../components/Login";

const Authentication = () => {
    const [auth, setAuth] = useState('login');

  return (
    <div className="w-[80%] h-full mx-auto my-0">
          {
              auth === 'login' ?
                <div>
                    <Login/>
                    <p className="text-center pt-4">New user? <span className="text-blue-500 cursor-pointer hover:underline decoration-blue-500" onClick={() => setAuth('signup')}>Create an account</span></p>
                </div> :
                <div>
                    <Signup/>
                    <p className="text-center pt-4">Already have an account? <span className="text-blue-500 cursor-pointer hover:underline decoration-blue-500" onClick={() => setAuth('login')}>Login</span></p>
                </div>
          }
          
          
    </div>
  )
}

export default Authentication