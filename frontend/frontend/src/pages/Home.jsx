import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div>
        <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1554672408-17395951edc0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" className="w-16 ml-8"/>
            <div className="bg-white py-4 px-4 pb-7">
                <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                <Link className="flex w-full items-center justify-center bg-black text-white py-3 rounded mt-5" to="/login" >Continue</Link>
            </div>

        </div>
    </div>
  )
}
