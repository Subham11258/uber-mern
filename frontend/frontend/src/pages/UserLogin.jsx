import { Link } from "react-router-dom"
import { useState } from "react"


export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email:email,
      password:password
    })
    console.log(userData);
    setEmail('');
    setPassword('');
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" className="w-16 mb-10"/>
        <form onSubmit={(e)=>submitHandler(e)}>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@example.com" 
            required />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="password" 
            required />
            <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            >Login</button>
            <p className="text-center">New here? <Link to="/signup" className="text-blue-600">Create new Account</Link></p>
        </form>
        </div>
        <div>
            <Link
            className="bg-[#10b461] flex items-center justify-center mb-5 text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            to="/captain-login"
            >Sign in as Captain</Link>
        </div>
    </div>
  )
}
