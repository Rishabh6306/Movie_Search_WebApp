// Context Api Parts
// Wherehouse
// Provider 
// consumer --> useContext() // Context Hoook 

import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=727bbdc1`

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({ show: false, mess: "" });

    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log("API Response:", data);

            if (data) {
                setIsLoading(false);
                setMovie(data);
            } else {
                setIsError({ show: true, mess: data.Error });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setIsError({ show: true, mess: "Something went wrong" });
        }
    }

    useEffect(() => {
        getMovies(API_URL);
    }, [])

    return (
        <AppContext.Provider value={{ isLoading, movie, isError }}>{children}</AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }; 