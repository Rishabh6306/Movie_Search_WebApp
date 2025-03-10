import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const SearchAndFilter = () => {
  // Get global states & update functions
  const { searchTerm, setSearchTerm, selectedGenre, setSelectedGenre, selectedYear, setSelectedYear, allMovies } = useGlobalContext();
  const [ showSuggestions, setShowSuggestions ] = useState(false);

  // Extract unique genres & years
  const genres = ["All", ...new Set(allMovies.flatMap(m => m.genres))];
  const years = ["All", ...new Set(allMovies.map(m => m.year))].sort((a, b) => b - a);

  // Filter suggestions based on input
  const suggestions = searchTerm ? allMovies.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5) : [];

  // When user clicks a suggestion
  const handleSelect = (title) => {
    setSearchTerm(title);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-purple-100 px-6 md:px-16 py-3 shadow-md fixed z-10 top-0 w-full flex flex-col items-center">
      {/* Top heading */}
      <h1 className="text-center text-2xl text-fuchsia-600 mb-2 font-semibold">Get Your Favourite Movies Here</h1>

      {/* Main row: search (left) + filters (right) */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Search with Home Icon */}
        <div className="relative w-full md:w-1/2">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-pink-500"><IoHome size={24} /></Link>
            <div className="relative w-full">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
                onFocus={() => searchTerm && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full text-xl px-4 py-2 rounded-xl border outline-none border-fuchsia-500 focus:bg-gray-100"
              />

              {/* Suggestions list */}
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute left-0 top-full mt-1 w-full bg-white rounded-md shadow max-h-60 overflow-y-auto z-20">
                  {suggestions.map((m, i) => (
                    <li key={i} className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onMouseDown={() => handleSelect(m.title)}>
                      {m.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Genre + Year Dropdowns */}
        <div className="flex gap-4 w-full md:w-auto justify-end">
          {[{ val: selectedGenre, set: setSelectedGenre, options: genres },
          { val: selectedYear, set: setSelectedYear, options: years }]
            .map(({ val, set, options }, i) => (
              <select
                key={i}
                value={val}
                onChange={(e) => set(e.target.value)}
                className="px-4 py-2 rounded-xl text-xl border border-fuchsia-200 focus:border-fuchsia-600"
              >
                {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;