import React, { useState } from "react";
import { useGlobalContext } from "../Context";

const SearchAndFilter = () => {
  // Accessing global state and update functions from context
  const {
    searchTerm, setSearchTerm,
    selectedGenre, setSelectedGenre,
    selectedYear, setSelectedYear,
    allMovies,
  } = useGlobalContext();

  const [showSuggestions, setShowSuggestions] = useState(false); // for showing/hiding the suggestions dropdown

  // Extract unique genres and years from allMovies
  const genres = ["All", ...new Set(allMovies.flatMap(m => m.genres))];
  const years = ["All", ...new Set(allMovies.map(m => m.year))].sort((a, b) => b - a);

  // Filter suggestions based on search term (top 5 only)
  const suggestions = searchTerm
    ? allMovies.filter(m =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5)
    : [];

  // When a suggestion is clicked
  const handleSuggestionClick = (title) => {
    setSearchTerm(title);        // set the selected title into the input box
    setShowSuggestions(false);   // hide the dropdown
  };

  return (
    <div className="bg-purple-100 px-16 py-3 shadow-md flex flex-col justify-between items-center fixed z-10 top-0 w-full">
      <h1 className='text-center text-2xl text-fuchsia-600 mb-2 font-semibold'>Get Your Favourite Movies Here</h1>
      {/* --- Left side: Search bar with suggestions --- */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <div className="relative w-fit md:w-1/2">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // delay so click can be registered
            className="w-full text-xl px-4 py-2 rounded-xl border outline-none border-fuchsia-500 focus:bg-gray-100"
          />

          {/* --- Suggestion dropdown below search --- */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white mt-1 rounded-md shadow max-h-60 overflow-y-auto">
              {suggestions.map((movie, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onMouseDown={() => handleSuggestionClick(movie.title)}
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* --- Right side: Genre and Year filters --- */}
        <div className="flex gap-4 w-fit md:w-auto">

          {/* Genre dropdown */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-1 rounded-xl text-xl border border-fuchsia-200 focus:border-fuchsia-600"
          >
            {genres.map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>

          {/* Year dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 rounded-xl text-xl border border-fuchsia-200 focus:border-fuchsia-600"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;