import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      if (response.status === 200) {
        // // Handle successful login (e.g., redirect to user profile)
        // navigate(`/cardUser/${response.data.userId}`); // Example redirect
        console.log("responsesignIn", response.data); // Check the response structure
        const userId = response.data.user.id; // Extract userId from the response
        navigate(`/cardInfo/${userId}`); 
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setMessage("Une erreur est survenue lors de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-900 via-gray-800 w-full to-gray-700 flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Connecter à votre compte</h2>
        <p className="text-md text-gray-300 mb-8 text-center">
          Connectez-vous à votre compte pour accéder à My-InfoCard.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Votre email</label>
            <div className="flex items-center border border-gray-500 rounded-lg bg-gray-700">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mx-3" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none"
                placeholder="nom@entreprise.com"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Mot de passe</label>
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
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-medium py-3 rounded-lg text-lg shadow-md hover:shadow-lg"
          >
            Se connecter
          </button>
        </form>
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        
        {/* Redirect to Registration */}
        <p className="text-gray-300 mt-4 text-center">
          Vous n'avez pas encore de compte? 
          <button 
            onClick={() => navigate('/register')} // Navigate to the registration page
            className="text-blue-400 hover:underline ml-1">
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
