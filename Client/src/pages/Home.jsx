import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const Home = () => {
  const { language, toggleLanguage } = useLanguage();

  const content = {
    EN: {
      title: "About Me",
      description: "Hello! I’m a passionate software developer with expertise in both front-end and back-end development, eager to create impactful digital solutions that bridge design and functionality. With a strong foundation in languages and frameworks like JavaScript, NodeJS, React, and Vue, I’ve built applications that are both user-friendly and robust.",
      contactTitle: "Contact Details",
      socialMediaTitle: "Social Media",
      url: "Links",
      videoTitle: "Video",
      imageTitle: "Images",
      portfolioTitle: "My Portfolio",
      portfolioDescription: "Hello! I’m a passionate software developer with expertise in both front-end and back-end.",
      footerTitle: "My Informatique",
      footerDescription:
        "Imadeddine and thousands of other professionals use My Informatique every day to stay connected with their clients and partners, share essential information, and grow their network.",
      footerButton1: "Get My Card",
      footerButton2: "Sign In",
    },
    FR: {
      title: "À propos",
      description: "Bonjour! Je suis un développeur de logiciels passionné avec une expertise tant dans le développement front-end que back-end, désireux de créer des solutions numériques impactantes qui relient design et fonctionnalité. Avec une solide expérience dans des langages et frameworks tels que JavaScript, NodeJS, React et Vue, j'ai construit des applications à la fois conviviales et robustes.",
      url: "Liens",
      contactTitle: "Coordonnées",
      socialMediaTitle: "Réseaux sociaux",
      videoTitle: "Vidéo",
      imageTitle: "Photos",
      portfolioTitle: "Mon portfolio",
      footerTitle: "My Informatique",
      portfolioDescription: "Bonjour! Je suis un développeur de logiciels passionné avec une expertise tant dans le développement front-end que back-end.",
      footerDescription:
      "Imadeddine et des milliers d'autres professionnels utilisent My Informatique chaque jour pour rester en contact avec leurs clients et partenaires, partager des informations essentielles et développer leur réseau.",
    footerButton1: "Obtenir ma carte",
    footerButton2: "Se Connecter",
    }
  };

  return (
    <>
    <div className="md:max-w-4xl flex-1 mx-auto bg-white shadow-lg rounded-lg mb-4 md:p-8">
      <div className="flex-1 p-4 relative">
        <div className="absolute inset-0 top-0 h-1/3 bg-black z-0"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between p-2">
            <h1 className="text-white font-bold text-xl text-center">Myinformatique</h1>
            <select onChange={toggleLanguage} value={language} className="text-black bg-white p-2 rounded-lg">
              <option value="EN">EN</option>
              <option value="FR">FR</option>
            </select>
          </div>

          <div className="flex gap-4 items-center bg-white border p-2 rounded-lg mt-6">
            <img
              src="https://res.cloudinary.com/dltbbvgop/image/upload/v1730234027/zncx7tclxxzstjffkzr7.jpg"
              alt="Profile"
              className="w-36 h-36 object-contain border mb-4 md:mb-0"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-black">Youssef <br /> TITAZAIM</h2>
              <p className="text-lg text-black font-semibold mt-2">@Company</p>
              <p className="text-lg text-black font-semibold mt-2">Designer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 p-2">
        <Link to="/add-contact" className="bg-black text-white font-semibold py-4 px-4 rounded-lg shadow-md">Ajouter aux contacts</Link>
        <Link to="/share-info" className="bg-black text-white font-semibold py-4 px-4 rounded-lg shadow-md">Partager mes infos</Link>
      </div>

      <div className="mt-2 p-2">
        <div>
          <h1 className="text-black items-center justify-between flex font-bold text-2xl mb-4 mt-4">{content[language].title}:</h1>
          <p className="text-black font-semibold">{content[language].description}</p>
        </div>
      </div>

      <div className="space-y-2 mt-4 p-2">
        <h1 className="text-black items-center justify-between flex font-bold text-2xl mb-4 mt-4">{content[language].contactTitle}:</h1>
        <div className="mt-4 text-gray-600 space-y-2">
          <div className="flex items-center">
            <FaEnvelope className="text-black text-lg mr-2" />
            <span className="text-black text-lg font-semibold">yousseftitazaim@gmail.com</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-black text-lg mr-2" />
            <span className="text-black text-lg font-semibold">Tanger</span>
          </div>
          <div className="flex items-center">
            <FaGlobe className="text-black text-lg mr-2" />
            <a href="https://www.yousseftitazaim.com" target="_blank" rel="noopener noreferrer" className="text-black text-lg font-semibold">titay@contact.com</a>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-2 p-2">
        <h1 className="text-black items-center justify-between flex font-bold text-2xl mb-4 mt-4">{content[language].socialMediaTitle}:</h1>
        <div className="flex flex-wrap md:justify-start gap-8">
          <a href="" target="_blank"><FaLinkedin className="text-blue-700 p-1 bg-white border text-6xl" /></a>
          <a href="" target="_blank"><FaTwitter className="text-blue-400 p-1 bg-white border text-6xl" /></a>
          <a href="" target="_blank"><FaFacebook className="text-blue-600 p-1 bg-white border text-6xl" /></a>
          <a href="" target="_blank"><FaYoutube className="text-red-600 p-1 bg-white border text-6xl" /></a>
          <a href="" target="_blank"><FaInstagram className="text-pink-600 p-1 bg-white border text-6xl" /></a>
          <a href="" target="_blank"><FaWhatsapp className="text-green-500 p-1 bg-white border text-6xl" /></a>
          <a href="" target="_blank"><FaTiktok className="text-black p-1 bg-white border text-6xl" /></a>
        </div>
      </div>

      <div className="mt-4 space-y-6 p-2">
        <h1 className="text-black items-center justify-between flex font-bold text-2xl mb-4 mt-12">{content[language].videoTitle}:
       
  <div className="flex items-center justify-center gap-2">
        <Link to='' className="ml-2 text-black">
          <FaEdit className="inline text-2xl" />
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 mt-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      </h1>
   
  <div className="aspect-w-16 aspect-h-9 relative rounded-lg shadow-md bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-semibold h-64">
    Téléchargez une vidéo à afficher ici
  </div>
  </div>

  {/* Images Section */}
  <div className="mt-4 space-y-6 p-2">
    <h1 className="text-black flex items-center justify-between font-bold text-2xl mb-4">
    {content[language].imageTitle}
      <div className="flex items-center justify-center gap-2">
        <Link to='' className="ml-2 text-black">
          <FaEdit className="inline text-2xl" />
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8 mt-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </h1>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative w-full h-32 overflow-hidden rounded-lg shadow-md bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold"
        >
          Téléchargez une image à afficher ici
        </div>
      ))}
    </div>
  </div>




      </div>
      
    

    {/* Footer Section */}
<div className="mt-12 flex-1 max-w-4xl mx-auto">

  <footer className="mt-4 p-4 bg-black border-t">
          <h2 className="text-xl text-white font-semibold mb-2">{content[language].footerTitle}</h2>
          <p className="text-white font-semibold">{content[language].footerDescription}</p>
          <div className="mt-6 flex justify-between items-center gap-4">
            <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg">
             <Link to="/Order">{content[language].footerButton1}</Link>
            </button>
            <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg">
              <Link to="/SignIn">{content[language].footerButton2}</Link>
            </button>
          </div>
        </footer>

  {/* Copyright Notice */}
  <div className="text-center text-white pb-2 bg-black pt-4">
    © {new Date().getFullYear()} My Informatique. All rights reserved.
  </div>
</div>
    </>
  );
};

export default Home;





























// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom


// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 flex flex-col justify-center items-center p-8">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h1 className="text-3xl font-bold text-gray-100 mb-6 tracking-wide drop-shadow-lg">
//           Bienvenue sur{" "}
//           <span className="text-blue-400 text-3xl ">MyInfoCard</span>
//         </h1>
//         <p className="text-lg text-gray-200 mb-4 max-w-lg mx-auto leading-relaxed">
//           Créez, gérez et montrez facilement vos informations personnelles.
//           Scannez votre carte pour configurer votre portfolio en quelques
//           secondes.
//         </p>
//         <p className="text-lg text-gray-200 opacity-80">
//           Accédez à vos informations à tout moment avec MyInfoCard.
//         </p>
//       </div>

//       {/* Video Section */}
//       <div className="mb-12 w-full max-w-lg rounded-lg overflow-hidden shadow-lg bg-gray-900">
//         <video className="w-full h-auto" controls>
//           <source
//             src="https://yourvideolink.com/video.mp4"
//             type="video/mp4"
//           />
//           Votre navigateur ne supporte pas la lecture vidéo.
//         </video>
//       </div>

//       {/* Button Section */}
//       <div>
//         <Link
//           to="/register" // Use Link to navigate to /register
//           className="bg-blue-500 hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105 text-white font-semibold py-4 px-8 rounded-full shadow-xl text-lg"
//         >
//           Démarrer la configuration
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;








