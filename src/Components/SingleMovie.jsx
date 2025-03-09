import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";

const SingleMovie = () => {
  const { id } = useParams(), navigate = useNavigate();
  const { getMovieById, singleMovie } = useGlobalContext();

  useEffect(() => { getMovieById(id); }, [id]); // fetch movie by id on mount

  if (!singleMovie) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-medium">Loading movie details...</p>
    </div>
  );

  // Destructure movie data
  const { title, year, posterUrl, genres, director, actors, plot } = singleMovie;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">← Back</button>
      
      {/* Movie card */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
        {/* Movie poster */}
        <img src={posterUrl} alt={title} onError={(e) => e.target.src = "https://via.placeholder.com/300x450?text=No+Image"} className="w-full md:w-[300px] h-[450px] object-cover rounded-xl" />
        
        {/* Movie details */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 mb-1"><strong>Year:</strong> {year}</p>
          <p className="text-gray-600 mb-1"><strong>Genres:</strong> {genres?.join(", ")}</p>
          <p className="text-gray-600 mb-1"><strong>Director:</strong> {director}</p>
          <p className="text-gray-600 mb-1"><strong>Actors:</strong> {actors}</p>
          <p className="text-gray-700 mt-4">{plot || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;