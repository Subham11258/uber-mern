import React, { useState, useRef } from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
export default function Home() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('form submitted');
  };

  useGSAP(()=>{
    if(panelOpen){
    gsap.to(panelRef.current,{
      height: '70%'
    })
  }else{
    gsap.to(panelRef.current,{
      height: '0%'
    })
  }
  },[panelOpen])
  return (
    <div className="h-screen relative">
      {/* Background Image */}
      <img
        src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg"
        alt="background"
        className="h-full w-full object-cover absolute top-0 left-0 z-0"
      />

      {/* Uber Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        className="w-16 absolute top-4 left-8 z-10"
      />

      {/* Overlay Content */}
      <div className="flex flex-col justify-end h-screen top-0 absolute w-full z-10">
        <div className="h-[30%] p-6 bg-white relative">
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="line absolute h-16 w-1 top-[45%] left-8 bg-gray-900 rounded-full"></div>
            <input
            onClick={()=>setPanelOpen(true)}
              value={pickup}
              onChange={(e)=>setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your location"
            />
            <input
              onClick={()=>setPanelOpen(true)}
              value={destination}
              onChange={(e)=>setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-red-500 h-0"> 

        </div>
      </div>
    </div>
  );
}
