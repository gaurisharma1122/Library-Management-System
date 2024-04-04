import { useState } from "react";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/v1/user/signin', { email, password })
      .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  };
  return (
    <div className="w-[50%] mx-auto my-auto">
      <h2 className="text-black px-2 text-center text-xl font-semibold mb-4">User Login</h2>
        <form action="" onSubmit={handleLogin}>
          <input className="w-full border-2 border-black rounded-md px-3 py-2 text-md mb-2" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full border-2 border-black rounded-md px-3 py-2 text-md" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="py-2 text-center w-full font-semibold text-white bg-blue-500 rounded-md mt-4" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Login