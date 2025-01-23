import React, {useContext} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function UserProtectedWrapper({children}) {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if(!token){
        navigate('/login');
    }
 
  return (
    <>
        {children}
    </>
  )
}
