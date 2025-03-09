import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            {/* Hero section with image background */}
            <div
                className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
                style={{ backgroundImage: "url('/banner.jpg')" }} // Image from public folder
            >
                <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">
                    Dive Into the World of Movies
                </h1>

                <p className="text-white text-lg md:text-2xl max-w-2xl drop-shadow-md mb-8">
                    Discover trending titles, hidden gems, timeless classics, cast & crew details, genres, and more — all in one place!
                </p>

                <Link to="/home"
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-bounce"
                >
                    Start Exploring
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;