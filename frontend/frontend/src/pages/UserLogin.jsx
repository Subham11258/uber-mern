import { Link } from "react-router-dom"

export default function UserLogin() {
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" className="w-16 mb-10"/>
        <form action="#" method="#">
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input 
            type="email" 
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@example.com" 
            required />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input 
            type="password" 
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="password" 
            required />
            <button
            className="bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            >Login</button>
            <p className="text-center">New here? <Link to="/signup" className="text-blue-600">Create new Account</Link></p>
        </form>
        </div>
        <div>
            <button
            className="bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            >Sign in as Captain</button>
        </div>
    </div>
  )
}
