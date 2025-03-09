import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { FaBackspace } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

const SingleMovie = () => {
  const { id } = useParams();

  const { getMovieById, singleMovie, allMovies, isLoading } = useGlobalContext();

  // Only call getMovieById when allMovies is loaded
  useEffect(() => {
    if (allMovies.length > 0) {
      getMovieById(id);
    }
  }, [id, allMovies]);

  // Still loading data
  if (isLoading || !singleMovie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium">Loading movie details...</p>
      </div>
    );
  }

  const { title, year, posterUrl, genres, director, actors, plot } = singleMovie;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between w-full">
        <Link to="/" className="text-pink-600 px-4 py-2 rounded hover:text-pink-700 transition"> <IoHome size={26} /> </Link>
        <Link to="/home" className="mb-4 text-pink-600 px-4 py-2 rounded hover:text-pink-700 transition"><FaBackspace size={26} /></Link>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
        <img
          src={posterUrl}
          alt={title}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
          }}
          className="w-full md:w-[300px] h-[450px] object-cover rounded-xl"
        />
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