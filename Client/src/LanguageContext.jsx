// import React, { createContext, useContext, useState } from 'react';

// const LanguageContext = createContext();

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('EN');

//   const switchLanguage = (lang) => {
//     setLanguage(lang);
//   };

//   return (
//     <LanguageContext.Provider value={{ language, switchLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   return useContext(LanguageContext);
// };
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
