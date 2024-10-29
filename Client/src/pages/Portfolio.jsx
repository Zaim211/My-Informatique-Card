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

const Portfolio = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [currentImage, setCurrentImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <div className="md:max-w-4xl flex-1 mx-auto  bg-white shadow-lg rounded-lg  mb-4 md:p-8">
        <div className="flex-1 p-2 relative">
          <div className="absolute inset-0 top-0 h-1/3 bg-black z-0"></div>

          <div className="absolute inset-0 top-1/4 h-1/4 bg-black z-0"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between p-2">
              <h1 className="text-white font-bold text-xl text-center ">
                Myinformatique
              </h1>
              <div className="flex items-center">
                <button className="text-white px-2 py-2 rounded-lg font-bold">
                  <Link to={`/cardUser/${userId}`}>Se déconnecté</Link>
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </div>

            <div className="flex gap-4 items-center bg-white border p-2 rounded-lg mt-6">
              <img
                src={data.imageUrl}
                alt="Profile"
                className="w-36 h-36  object-contain border mb-4 md:mb-0"
              />

              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-black">
                  {data.firstName} <br /> {data.lastName}
                </h2>
                <p className="text-lg text-black font-semibold mt-2">
                  @{data.company}
                </p>
                <p className="text-lg text-black font-semibold mt-2">
                  {data.jobTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-left mt-4 pl-2">
          <Link
            to={`/cardUser/${userId}`}
            className="bg-black text-white px-2 py-4 rounded-lg font-bold"
          >
            Mettre à jour votre Portfolio
          </Link>
        </div>

        <div className="mt-2 p-2">
          {data.bio && (
            <div>
              <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-4">
                A propos:
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
              <p className="text-black font-semibold">{data.bio}</p>
            </div>
          )}
        </div>

        <div className="space-y-2 mt-4 p-2">
          <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-4">
            Coordonnées:
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
    Liens:
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
      {truncateUrl(data.website)}
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
    <p className="text-gray-600 font-bold">{data.portfolioDescription}</p>
  </div>
</div>

  </div>
</div>


        <div className="mt-4 space-y-6 p-2">
          {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
            <div>
              <h1 className="text-black items-center justify-between flex  font-bold text-2xl mb-4 mt-12">
                Réseaux sociaux:
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
                Video:
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
                  Images:
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

      <div className="mt-12">
        <footer className="border-t max-w-4xl rounded-t-lg mx-auto bg-black pt-4 mt-6 pb-4 text-center text-white">
          © {new Date().getFullYear()} My Informatique. All rights reserved.
        </footer>
      </div>
    </>
  );
};

export default Portfolio;
