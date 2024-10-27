// src/pages/Home.jsx
import React, { useState } from 'react';
import AccountCreation from '../components/AccountCreation';

const Home = () => {
  const [showAccountCreation, setShowAccountCreation] = useState(false);

  // Function to handle button click and show AccountCreation component
  const handleStartConfiguration = () => {
    setShowAccountCreation(true); // Show the AccountCreation component
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-6">
      {!showAccountCreation ? (
        <>
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
              Bienvenue sur <span className="text-yellow-300">MyInfoCard</span>
            </h1>
            <p className="text-lg text-white opacity-90 mb-2">Créez, gérez et montrez facilement vos informations personnelles.</p>
            <p className="text-lg text-white opacity-90 mb-2">Scannez simplement votre carte et configurez votre portfolio en quelques secondes.</p>
            <p className="text-lg text-white opacity-90">Utilisez votre carte pour accéder à vos infos à tout moment.</p>
          </div>

          {/* Video Section */}
          <div className="mb-8 w-full max-w-md overflow-hidden rounded-xl shadow-lg bg-white">
            <video className="w-full h-auto" controls>
              <source src="https://yourvideolink.com/video.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>

          {/* Button Section */}
          <div>
            <button
              onClick={handleStartConfiguration}
              className="bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-300 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg text-xl"
            >
              Démarrer la configuration
            </button>
          </div>
        </>
      ) : (
        // Render AccountCreation component when button is clicked
        <AccountCreation />
      )}
    </div>
  );
};

export default Home;
