import React from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const { visibleMovies, searchTerm, isLoading } = useGlobalContext();
  const navigate = useNavigate();

  // Show loading spinner
  if (isLoading) return <div className="flex justify-center items-center h-screen"><p className="text-xl font-semibold">Loading...</p></div>;

  return (
    <section className="p-4 sm:p-8 min-h-screen mt-36 md:mt-24 bg-gray-100">
      {/* Show message if no movies found */}
      {!visibleMovies.length ? (
        <p className="text-center text-lg font-medium">No movies found{searchTerm && ` for "${searchTerm}"`}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center">
          {visibleMovies.map(({ title, year, posterUrl, uid }) => (
            <div key={uid} onClick={() => navigate(`/movie/${uid}`)} className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <img src={posterUrl} alt={title} className="w-[300px] h-[400px] object-cover rounded-t-xl" onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
              }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-1">{title}</h2>
                <p className="text-lg text-gray-600">{year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Movies;