// import React, { useState } from "react";
// import AccountCreation from "./AccountCreation";

// const Home = () => {
//   const [showAccountCreation, setShowAccountCreation] = useState(false);

//   const handleStartConfiguration = () => {
//     setShowAccountCreation(true);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex flex-col justify-center items-center p-8">
//       {!showAccountCreation ? (
//         <>
//           {/* Header Section */}
//           <div className="text-center mb-12">
//             <h1 className="text-3xl font-bold text-gray-100 mb-6 tracking-wide drop-shadow-lg">
//               Bienvenue sur{" "}
//               <span className="text-blue-400 text-3xl ">MyInfoCard</span>
//             </h1>
//             <p className="text-lg text-gray-200 mb-4 max-w-lg mx-auto leading-relaxed">
//               Créez, gérez et montrez facilement vos informations personnelles.
//               Scannez votre carte pour configurer votre portfolio en quelques
//               secondes.
//             </p>
//             <p className="text-lg text-gray-200 opacity-80">
//               Accédez à vos informations à tout moment avec MyInfoCard.
//             </p>
//           </div>

//           {/* Video Section */}
//           <div className="mb-12 w-full max-w-lg rounded-lg overflow-hidden shadow-lg bg-gray-900">
//             <video className="w-full h-auto" controls>
//               <source
//                 src="https://yourvideolink.com/video.mp4"
//                 type="video/mp4"
//               />
//               Votre navigateur ne supporte pas la lecture vidéo.
//             </video>
//           </div>

//           {/* Button Section */}
//           <div>
//             <button
//               onClick={handleStartConfiguration}
//               className="bg-blue-500 hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105 text-white font-semibold py-4 px-8 rounded-full shadow-xl text-lg"
//             >
//               Démarrer la configuration
//             </button>
//           </div>
//         </>
//       ) : (
//         // Render AccountCreation component when button is clicked
//         <AccountCreation />
//       )}
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import AccountCreation from "./AccountCreation";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex flex-col justify-center items-center p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 tracking-wide drop-shadow-lg">
          Bienvenue sur{" "}
          <span className="text-blue-400 text-3xl ">MyInfoCard</span>
        </h1>
        <p className="text-lg text-gray-200 mb-4 max-w-lg mx-auto leading-relaxed">
          Créez, gérez et montrez facilement vos informations personnelles.
          Scannez votre carte pour configurer votre portfolio en quelques
          secondes.
        </p>
        <p className="text-lg text-gray-200 opacity-80">
          Accédez à vos informations à tout moment avec MyInfoCard.
        </p>
      </div>

      {/* Video Section */}
      <div className="mb-12 w-full max-w-lg rounded-lg overflow-hidden shadow-lg bg-gray-900">
        <video className="w-full h-auto" controls>
          <source
            src="https://yourvideolink.com/video.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      </div>

      {/* Button Section */}
      <div>
        <Link
          to="/register" // Use Link to navigate to /register
          className="bg-blue-500 hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105 text-white font-semibold py-4 px-8 rounded-full shadow-xl text-lg"
        >
          Démarrer la configuration
        </Link>
      </div>
    </div>
  );
};

export default Home;
