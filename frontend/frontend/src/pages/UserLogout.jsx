import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function UserLogout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    console.log(token);

    useEffect(()=>{
        if(!token){
            navigate('/login');
        }
    },[token])

  return (
    <div>UserLogout</div>
  )
}
