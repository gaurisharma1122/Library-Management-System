import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const handleSignup = (e) => {
        e.preventDefault();
    };
  return (
      <div className="w-[50%] mx-auto my-auto">
        <h2 className="text-black px-2 text-center text-xl font-semibold mb-4">Create an Account</h2>
          <form action="" onSubmit={handleSignup}>
              <input className="w-full border-2 border-black rounded-md px-3 py-2 text-md mb-2" type="text" placeholder="Enter first name" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full border-2 border-black rounded-md px-3 py-2 text-md mb-2" type="text" placeholder="Enter last name" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input className="w-full border-2 border-black rounded-md px-3 py-2 text-md mb-2" type="email" placeholder="Enter email" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              <input className="w-full border-2 border-black rounded-md px-3 py-2 text-md" type="password" placeholder="Enter password"
              value={lastname} onChange={(e) => setLastname(e.target.value)}/>
            <button className="py-2 text-center w-full font-semibold text-white bg-blue-500 rounded-md mt-4" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Signup