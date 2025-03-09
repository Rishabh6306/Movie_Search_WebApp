import React from "react";
import { useGlobalContext } from "../Context";

const SearchAndFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedGenre,
    setSelectedGenre,
    selectedYear,
    setSelectedYear,
    allMovies,
  } = useGlobalContext();

  // Dynamically get genres and years from the movie data
  const genres = ["All", ...new Set(allMovies.flatMap((movie) => movie.genres))];
  const years = ["All", ...new Set(allMovies.map((movie) => movie.year))].sort((a, b) => b - a);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
      {/* Search */}
      <input
        type="text"
        placeholder="Search movies..."
        className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Genre Filter */}
      <select
        className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        {genres.map((genre, index) => (
          <option value={genre} key={index}>
            {genre}
          </option>
        ))}
      </select>

      {/* Year Filter */}
      <select
        className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;