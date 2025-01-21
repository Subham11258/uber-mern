import { Link } from "react-router-dom"
import { useState } from "react"


export default function CaptainSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [captainData, setCaptainData] = useState({});

  const submitHandler =(e)=>{
    e.preventDefault();
    setCaptainData({
      fullName:{
        firstName:firstName,
        lastName:lastName,
      },
      
      email:email,
      password:password,
      
    })
    console.log(captainData);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }
  
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" className="w-16 mb-10"/>
        <form onSubmit={(e)=>submitHandler(e)}>
            <h3 className="text-base font-medium mb-2">What's your name</h3>
            <div className="flex gap-4 mb-5">
            <input 
            type="text" 
            
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            placeholder="First name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required />
            <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
            placeholder="Last name" 
            required />
            </div>
            <h3 className="text-base font-medium mb-2">What's your email</h3>
            <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="email@example.com" 
            required />
            <h3 className="text-base font-medium mb-2">Enter Password</h3>
            <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            placeholder="password" 
            required />
            <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm"
            >Sign up</button>
            <p className="text-center">Already registered? <Link to="/captain-login" className="text-blue-600">Sign in</Link></p>
        </form>
        </div>
        <div>
            <p className="text-[10px]">This site is protected by reCAPTCHA and the <span className="underline">Google Policy</span> and <span className="underline">Terms of Service</span></p>
        </div>
    </div>
  )
}
