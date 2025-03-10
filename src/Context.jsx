import React, { createContext, useContext, useEffect, useState } from "react";
import movieData from "../movieData.json";

// Create Context
const AppContext = createContext();

// Provider Component
const AppProvider = ({ children }) => {
  // Global State
  const [allMovies, setAllMovies] = useState([]); // full movie list
  const [filteredMovies, setFilteredMovies] = useState([]); // after search/filter
  const [visibleMovies, setVisibleMovies] = useState([]); // shown on screen (infinite scroll)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, mess: "" });
  const [singleMovie, setSingleMovie] = useState(null);
  const [loadCount] = useState(10); // items per scroll

  // Get a single movie by ID for detail page
  const getMovieById = (id) => {
    const movie = allMovies.find((m) => m.uid === id);
    setSingleMovie(movie || null);
  };

  // Load all movies on app start and assign unique ID
  const loadMovies = async () => {
    try {
      const validMovies = movieData.movies.map((m, i) => ({ ...m, uid: `movie-${i}` }));
      setAllMovies(validMovies);
      setFilteredMovies(validMovies);
      setVisibleMovies(validMovies.slice(0, loadCount));
      setIsLoading(false);
    } catch (error) {
      setIsError({ show: true, mess: "Something went wrong while loading movies." });
    }
  };

  // Filter movies by search, genre, and year
  const filterMovies = () => {
    // Reset visible movies to first loadCount
    let result = [...allMovies];

    // Apply search term filter if exists
    if (searchTerm.trim()) result = result.filter((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Apply genre filter if exists
    if (selectedGenre !== "All") result = result.filter((m) => m.genres.includes(selectedGenre));

    // Apply year filter if exists
    if (selectedYear !== "All") result = result.filter((m) => m.year === selectedYear);

    // Set filtered and visible movies
    setFilteredMovies(result);
    setVisibleMovies(result.slice(0, loadCount));
  };

  // Load more movies on scroll
  const loadMoreMovies = () => setVisibleMovies(filteredMovies.slice(0, visibleMovies.length + loadCount));

  // Initial movie load
  useEffect(() => { loadMovies() }, []);

  // Filter when input or filters change (with debounce)
  useEffect(() => {
    if (allMovies.length) {
      const delay = setTimeout(filterMovies, 300);
      return () => clearTimeout(delay);
    }
  }, [searchTerm, selectedGenre, selectedYear, allMovies]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled near bottom (visible height + scroll + 100px buffer from bottom)
      // If it’s greater than or equal to full page height, trigger load more
      if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
        loadMoreMovies();
      }
    };

    // Add scroll event listener to window
    window.addEventListener("scroll", handleScroll);
    // Clean up function to remove event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredMovies, visibleMovies]);

  return (
    // Provide values as context to all children components under AppProvider
    <AppContext.Provider value={{ isLoading, isError, searchTerm, setSearchTerm, selectedGenre, setSelectedGenre, selectedYear, setSelectedYear, visibleMovies, allMovies, filteredMovies, getMovieById, singleMovie }} >
      {children}
    </AppContext.Provider>
  );
};

// Export hook for usage
const useGlobalContext = () => useContext(AppContext);
export { AppProvider, useGlobalContext };