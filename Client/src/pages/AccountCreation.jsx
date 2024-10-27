// import React, { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLock, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import axios from 'axios';
// import ConfirmationAccount from './ConfirmationAccount'; // Import the ConfirmationAccount component

// const AccountCreation = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false); // State to track registration status

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     setConfirmPassword(event.target.value);
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage("Les mots de passe ne correspondent pas");
//       return;
//     }

//     try {
//       const response = await axios.post('/register', { email, password });
//       if (response.status === 201) {
//         setIsRegistered(true); // Set registered status to true
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'inscription :", error);
//       setMessage("Une erreur est survenue lors de l'inscription.");
//     }
//   };

//   // Render ConfirmationAccount component if registered
//   if (isRegistered) {
//     return <ConfirmationAccount />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b mt-6 from-indigo-500 via-purple-500 to-pink-500 p-2 flex flex-col items-start">
//       <h2 className="text-2xl font-bold text-white mb-6">Création de compte</h2>
//       <p className="text-xl text-white mb-4">
//         Saisissez votre email professionnel et un mot de passe pour vos futures connexions à votre espace My-InfoCard
//       </p>
//       <form className="space-y-4 w-full max-w-lg mt-6" onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Votre email</label>
//           <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-orange-500">
//             <FontAwesomeIcon icon={faEnvelope} className="text-md mx-3 text-white" />
//             <input
//               type="email"
//               name="email"
//               id="email"
//               onChange={handleEmailChange}
//               className="bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 block w-full p-3"
//               placeholder="nom@entreprise.com"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Mot de passe</label>
//           <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-orange-500">
//             <FontAwesomeIcon icon={faLock} className="text-md mx-3 text-white" />
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               id="password"
//               onChange={handlePasswordChange}
//               className="bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 block w-full p-3"
//               placeholder="••••••••"
//               required
//             />
//             <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-md mx-3 text-white cursor-pointer" onClick={toggleShowPassword} />
//           </div>
//         </div>
//         <div>
//           <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white">Confirmez le mot de passe</label>
//           <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-orange-500">
//             <FontAwesomeIcon icon={faLock} className="text-md mx-3 text-white" />
//             <input
//               type={showPassword ? "text" : "password"}
//               name="confirmPassword"
//               id="confirmPassword"
//               onChange={handleConfirmPasswordChange}
//               className="bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 block w-full p-3"
//               placeholder="••••••••"
//               required
//             />
//           </div>
//         </div>
//         <button type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-300 text-white font-medium rounded-lg text-sm px-5 py-3 text-center">
//           Créer un compte
//         </button>
//       </form>
//       {message && <p className="text-red-500 mt-4">{message}</p>}
//     </div>
//   );
// };

// export default AccountCreation;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const AccountCreation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const response = await axios.post("/register", { email, password });
      if (response.status === 201) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setMessage("Une erreur est survenue lors de l'inscription.");
    }
  };
  if (redirect) {
    return <Navigate to={'/confirmation'} />;
  }
  return (
    <div className="min-h-screen max-w-4xl bg-gradient-to-b p-4 from-gray-900 via-gray-800 w-full to-gray-700 flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
          Création de compte
        </h2>
        <p className="text-md text-gray-300 mb-8 text-center">
          Saisissez votre email professionnel et un mot de passe pour accéder à
          My-InfoCard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Votre email
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg bg-gray-700">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-400 mx-3"
              />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-3 bg-gray-700 text-white placeholder-gray-500 focus:outline-none"
                placeholder="nom@entreprise.com"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Mot de passe
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg bg-gray-700">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mx-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-3 bg-gray-700 text-white placeholder-gray-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-gray-400 mx-3 cursor-pointer"
                onClick={toggleShowPassword}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Confirmez le mot de passe
            </label>
            <div className="flex items-center border border-gray-500 rounded-lg bg-gray-700">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mx-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full p-3 bg-gray-700 text-white placeholder-gray-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-medium py-3 rounded-lg text-lg shadow-md hover:shadow-lg"
          >
            Créer un compte
          </button>
        </form>
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        {/* Sign In Link */}
        <p className="text-gray-300 mt-4 text-center">
          Vous avez déjà un compte?
          <Link to="/SignIn" className="text-blue-400 hover:underline ml-1">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AccountCreation;
