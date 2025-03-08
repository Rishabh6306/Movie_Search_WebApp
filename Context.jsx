// Context Api Parts
// Wherehouse
// Provider 
// consumer --> useContext() // Context Hoook 

import React, { createContext, useContext, useEffect } from 'react';

const AppContext = createContext();

const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=727bbdc1`

const AppProvider = ({ children }) => {

    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getMovies(API_URL);
    }, [])

    return (
        <AppContext.Provider value="Rishabh">{children}</AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };