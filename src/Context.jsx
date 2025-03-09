import React, { createContext, useContext, useEffect, useState } from 'react';
import movieData from '../movieData.json';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, mess: "" });
  const [singleMovie, setSingleMovie] = useState(null);
  const [loadCount] = useState(10);

  const getMovieById = (id) => {
    const movie = allMovies.find((movie, index) => `${movie.title}-${index}` === id);
    setSingleMovie(movie || null);
  };

  const isImageValid = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const loadMovies = async () => {
    try {
      const validMovies = [];
      for (const movie of movieData.movies) {
        const isValid = await isImageValid(movie.posterUrl);
        if (isValid) validMovies.push(movie);
      }
      setAllMovies(validMovies);
      setFilteredMovies(validMovies);
      setVisibleMovies(validMovies.slice(0, loadCount));
      setIsLoading(false);
    } catch (error) {
      console.error("Loading error:", error);
      setIsError({ show: true, mess: "Something went wrong while loading movies." });
    }
  };

  const loadMoreMovies = () => {
    const moreMovies = filteredMovies.slice(0, visibleMovies.length + loadCount);
    setVisibleMovies(moreMovies);
  };

  const filterMovies = () => {
    let filtered = [...allMovies];

    if (searchTerm.trim()) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== "All") {
      filtered = filtered.filter((movie) => movie.genres.includes(selectedGenre));
    }

    if (selectedYear !== "All") {
      filtered = filtered.filter((movie) => movie.year === selectedYear);
    }

    setFilteredMovies(filtered);
    setVisibleMovies(filtered.slice(0, loadCount));
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      filterMovies();
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [searchTerm, selectedGenre, selectedYear]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        loadMoreMovies();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredMovies, visibleMovies]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isError,
        searchTerm,
        setSearchTerm,
        selectedGenre,
        setSelectedGenre,
        selectedYear,
        setSelectedYear,
        visibleMovies,
        allMovies,
        getMovieById,
        singleMovie,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };