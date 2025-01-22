import React,{useState , createContext } from 'react'

export const UserDataContext = createContext();

export default function UserContext({children}) {
    const [user, setUser] = useState({
        
        fullname:{
            firstname:'',
            lastname:''
        },
        email: '',
        
    }
    );
  return (
    <div>
        <UserDataContext.Provider value={{user, setUser}}>
        {children}
        </UserDataContext.Provider>
    </div>
  )
}
