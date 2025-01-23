import { createContext, useReducer } from 'react';
import { useState } from 'react';
export const CaptainDataContext = createContext();



export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }
    const value = {
        captain,
        setCaptain,
        
    }

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext;