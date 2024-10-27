// ConfirmationAccount.js
import React from 'react';

const ConfirmationAccount = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Compte Créé !</h2>
        <p className="text-white">
          Veuillez vérifier votre email pour activer votre compte.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationAccount;
