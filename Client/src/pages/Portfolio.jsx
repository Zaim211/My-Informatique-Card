import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { useLanguage } from "../LanguageContext";
// import { Translate } from '@google-cloud/translate';




const Portfolio = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [currentImage, setCurrentImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  // const translate = new Translate({ key: 'AIzaSyBsiNnfka5ZhygmI3jMtxHezgw5opk945I' });

  // useEffect(() => {
  //   const translateData = async () => {
  //     if (language === "FR") {
  //       try {
  //         const [translatedJobTitle] = await translate.translate(data.jobTitle, "fr");
  //         const [translatedBio] = await translate.translate(data.bio, "fr");
  //         const [translatedPortfolioDescription] = await translate.translate(data.portfolioDescription, "fr");

  //         setTranslatedData({
  //           jobTitle: translatedJobTitle,
  //           bio: translatedBio,
  //           portfolioDescription: translatedPortfolioDescription,
  //         });
  //       } catch (err) {
  //         console.error("Error translating data:", err);
  //       }
  //     } else {
  //       setTranslatedData(data); // Use original data for English
  //     }
  //   };

  //   translateData();
  // }, [language, data]);

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  useEffect(() => {
    if (!userId) return;
    const fetchFormData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/scanForm/${userId}`);
        setData(response.data);
      } catch (err) {
        setError("Unable to retrieve data");
      } finally {
        setLoading(false);
      }
    };
    fetchFormData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const truncateUrl = (url, maxLength = 25) => {
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  };

  const extractYouTubeID = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/embed\/)([^"&?/ ]{11})/
    );
    return match ? match[1] : null;
  };


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
  const translatedContent = data.translations?.[language] || data.translations?.EN || {};
  console.log('translatedContent', translatedContent);

  return (
    <>
      <div className="md:max-w-4xl flex-1 mx-auto  bg-white shadow-lg rounded-lg  mb-4 md:p-8">
        <div className="flex-1 p-2 relative">
          <div className="absolute inset-0 top-0 h-1/3 bg-black z-0"></div>

          <div className="absolute inset-0 top-1/4 h-1/4 bg-black z-0"></div>

          <div className="relative z-10">
          
            <div className="flex items-center justify-between p-2">
            <h1 className="text-white font-bold text-xl text-center">Myinformatique</h1>
            <select onChange={toggleLanguage} value={language} className="text-black bg-white p-2 rounded-lg">
              <option value="EN">EN</option>
              <option value="FR">FR</option>
            </select>
      
            </div>
            <div className="flex flex-col md:flex-row gap-4 bg-white border p-2 rounded-lg mt-6">
              <div className="flex items-center">
                <img
                  src={data.imageUrl}
                  alt="Profile"
                  className="w-36 h-36 object-contain border mb-4 md:mb-0"
                />
                <div className="text-center md:text-left ml-4">
                  <h2 className="text-2xl font-bold text-black">
                    {data.firstName} <br /> {data.lastName}
                  </h2>
                  <p className="text-lg text-black font-semibold mt-2">
                    @{data.company}
                  </p>
                  <p className="text-lg text-black font-semibold mt-2">
                  {translatedContent.jobTitle || data.jobTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 p-2">
          <Link
            to=""
            className="bg-black text-white font-semibold py-4 px-4 rounded-lg shadow-md"
          >
            Ajouter aux contacts
          </Link>
          <Link
            to=""
            className="bg-black text-white font-semibold py-4 px-4 rounded-lg shadow-md"
          >
            Partager mes infos
          </Link>
        </div>

        <div className="mt-2 p-2">
          {data.bio && (
            <div>
              <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-4">
              {content[language].title}:
                <div className="flex items-center justify-center gap-2">
                  <Link to={`/cardUser/${userId}`} className="ml-2 text-black">
                    <FaEdit className="inline text-2xl" />
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-8 mt-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
              </h1>
              <p className="text-black font-semibold">
              {translatedContent.bio || data.bio}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2 mt-4 p-2">
          <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-4">
          {content[language].contactTitle}:
            <div className="flex items-center justify-center gap-2">
              <Link to={`/cardUser/${userId}`} className="ml-2 text-black">
                <FaEdit className="inline text-2xl" />
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-8 mt-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </h1>

          <div className="mt-4 text-gray-600 space-y-2">
            {data.email && (
              <div className="flex items-center ">
                <FaEnvelope className="text-black text-lg mr-2" />
                <span className="text-black text-lg font-semibold">
                  {data.email}
                </span>
              </div>
            )}
            {data.address && (
              <div className="flex items-center ">
                <FaMapMarkerAlt className="text-black text-lg mr-2" />
                <span className="text-black text-lg font-semibold">
                  {data.address}
                </span>
              </div>
            )}
            {data.website && (
              <div className="flex items-center ">
                <FaGlobe className="text-black text-lg mr-2" />
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black text-lg font-semibold"
                >
                  {truncateUrl(data.website)}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* <div className="space-y-2 mt-4 p-2">
          <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-12">
            Liens:
            <div className="flex items-center justify-center gap-2">
              <Link to={`/cardUser/${userId}`} className="ml-2 text-black">
                <FaEdit className="inline text-2xl" />
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-8 mt-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </h1>
        
          <div className="flex items-center gap-4">
          
            <div className="flex-shrink-0">
              <img
                src={data.portfolioImage}
                alt="Portfolio"
                className="w-[80px] h-[80px] border border-gray-300 rounded-md object-cover"
              />
            </div>

 
            <div className="flex-1">
        
              <div className="mb-2">
                <p className="text-gray-600 font-bold">{data.website}</p>
              </div>

          
              <div className="mb-2">
                <p className="text-gray-600 font-bold">{data.portfolioTitle}</p>
              </div>

        
              <div className="mb-2">
                <p className="text-gray-600 font-bold">
                  {data.portfolioDescription}
                </p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="space-y-2 mt-2 p-2">
          <h1 className="text-black items-center justify-between flex font-bold text-2xl mb-4 mt-4">
            {content[language].url}:
            <div className="flex items-center justify-center gap-2">
              <Link to={`/cardUser/${userId}`} className="ml-2 text-black">
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
          {/* Portfolio Details Section */}
          <div className="flex items-center gap-4">
            {/* Left: Portfolio Image */}
            <div className="flex-shrink-0">
              <img
                src={data.portfolioImage} // Use your image URL here
                alt="Portfolio"
                className="w-32 h-32 object-cover" // Changed height to full
              />
            </div>

            {/* Right: Portfolio URL, Title, and Description */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Portfolio URL */}
              <div className="flex items-center mb-2">
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 font-bold"
                >
                  {data.website}
                </a>
              </div>

              {/* Separator Line */}
              <hr className="border-gray-300 mb-2" />

              {/* Portfolio Title */}
              <div className="mb-1">
                <p className="text-gray-600 font-bold">{data.portfolioTitle}</p>
              </div>

              {/* Separator Line */}
              <hr className="border-gray-300 mb-2" />

              {/* Portfolio Description */}
              <div className="mb-1">
                <p className="text-gray-600 font-bold">
                  {data.portfolioDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-6 p-2">
          {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
            <div>
              <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-12">
                {content[language].socialMediaTitle}:
                <div className="flex items-center justify-center gap-2">
                  <Link to={`/cardUser/${userId}`} className="ml-2 text-black">
                    <FaEdit className="inline text-2xl" />
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-8 mt-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
              </h1>

              <div className="flex flex-wrap  md:justify-start gap-8">
                {data.socialLinks.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank">
                    <FaLinkedin className="text-blue-700 p-1 bg-white border text-6xl" />
                  </a>
                )}
                {data.socialLinks.twitter && (
                  <a href={data.socialLinks.twitter} target="_blank">
                    <FaTwitter className="text-blue-400 p-1 bg-white border text-6xl" />
                  </a>
                )}
                {data.socialLinks.facebook && (
                  <a href={data.socialLinks.facebook} target="_blank">
                    <FaFacebook className="text-blue-600 p-1 bg-white border text-6xl" />
                  </a>
                )}
                {data.socialLinks.youtube && (
                  <a
                    href={data.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="text-red-600 p-1 bg-white border text-6xl" />
                  </a>
                )}
                {data.socialLinks.instagram && (
                  <a
                    href={data.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-pink-600 p-1 bg-white border text-6xl" />
                  </a>
                )}
                {data.socialLinks.whatsapp && (
                  <a
                    href={data.socialLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="text-green-500 p-1 bg-white border text-6xl" />
                  </a>
                )}
                {data.socialLinks.tiktok && (
                  <a
                    href={data.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTiktok className="text-black p-1 bg-white border text-6xl" />
                  </a>
                )}
              </div>
            </div>
          )}

          {data.videoUrl && (
            <div>
              <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-12">
                {content[language].videoTitle}:
                <div className="flex items-center justify-center gap-2">
                  <Link to={`/cardUser/${userId}`} className="ml-2 text-black">
                    <FaEdit className="inline text-2xl" />
                  </Link>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-8 mt-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </div>
              </h1>
              <div className="aspect-w-16 aspect-h-9">
                <YouTube
                  videoId={extractYouTubeID(data.videoUrl)}
                  opts={{
                    width: "100%",
                    playerVars: {
                      autoplay: 0,
                      controls: 1,
                      modestbranding: 1,
                    },
                  }}
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          )}

          <div className="p-2">
            {data.portfolioImages && data.portfolioImages.length > 0 && (
              <div>
                <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-4">
                  {content[language].imageTitle}:
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/cardUser/${userId}`}
                      className="ml-2 text-black"
                    >
                      <FaEdit className="inline text-2xl" />
                    </Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-8 mt-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  </div>
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data.portfolioImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative w-full h-32 overflow-hidden cursor-pointer"
                      onClick={() => openModal(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isOpen && currentImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={closeModal}
              >
                <div className="relative">
                  <img
                    src={currentImage}
                    alt="Expanded view"
                    className="w-auto max-w-full max-h-full rounded-lg"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-white text-2xl font-bold bg-gray-700 rounded-full p-2"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="mt-12 flex-1 max-w-4xl mx-auto">
        <footer className="mt-4 p-4 bg-black border-t">
          <h2 className="text-xl text-white font-semibold mb-2">
            MyInformatique
          </h2>
          <p className="text-white font-semibold">
            Imadeddine et des milliers d'autres professionnels utilisent My
            Informatique chaque jour pour rester en contact avec leurs clients
            et partenaires, partager des informations essentielles et développer
            leur rése
          </p>
          <div className="mt-6 flex justify-between items-center gap-4">
            <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg">
              <Link to="/Order">Obtenir ma carte</Link>
            </button>
            <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg">
              <Link to="/SignIn">Se Connecter</Link>
            </button>
          </div>
        </footer>

        <div className="text-center text-white pb-2 bg-black pt-4">
          © {new Date().getFullYear()} My Informatique. All rights reserved.
        </div>
      </div> */}
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

export default Portfolio;
