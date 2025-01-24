  import { Link } from "react-router-dom"
  import { useState } from "react"
  import { useNavigate } from "react-router-dom";
  import { useContext } from "react";
  import { CaptainDataContext } from "../context/CaptainContext";
  import axios from "axios";
  
  export default function CaptainLogin() {
    const {captain, setCaptain} = useContext(CaptainDataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
  
    const submitHandler = async(e) => {
      e.preventDefault();
      const captainData = {
        email:email,
        password:password
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
      if(response.status === 200){
        const data = response.data;
        console.log(data);
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
      
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
              <p className="text-center">Join a fleet? <Link to="/captain-signup" className="text-blue-600">Register as a Captain</Link></p>
          </form>
          </div>
          <div>
              <Link
              className="bg-[#e8c207] flex items-center justify-center mb-5 text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              to="/login"
              >Sign in as User</Link>
          </div>
      </div>
    )
  }
  

