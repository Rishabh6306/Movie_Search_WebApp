import React from "react";
import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom"; // ✅ add this

const Movies = () => {
  const { visibleMovies, searchTerm, isLoading } = useGlobalContext();
  const navigate = useNavigate(); // ✅ initialize

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      {visibleMovies.length === 0 ? (
        <p className="text-center text-lg font-medium">
          No movies found for "<span className="text-blue-600">{searchTerm}</span>"
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleMovies.map((movie, index) => {
            const { title, year, posterUrl } = movie;
            const movieId = `${title}-${index}`; // create id for URL

            return (
              <div
                key={movieId}
                onClick={() => navigate(`/movie/${movieId}`)} // ✅ navigate on click
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={posterUrl}
                  alt={title}
                  className="w-full h-[400px] object-cover rounded-t-xl"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x450?text=No+Image";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-1">{title}</h2>
                  <p className="text-sm text-gray-600">{year}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Movies;