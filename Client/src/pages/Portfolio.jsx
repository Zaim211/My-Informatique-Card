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
    <div className="max-w-4xl flex-1 mx-auto border-t-8 border-t-black bg-white shadow-lg rounded-lg p-4 mb-4 md:p-8">
      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 md:border-r md:pr-8">
        {/* Profile Image */}
        <img
          src={data.imageUrl}
          alt="Profile"
          className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border mb-4 md:mb-0"
        />

        {/* Profile Details */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-black">
            {data.firstName} {data.lastName}
          </h2>
          <p className="text-lg text-black font-semibold mt-2">
            {data.jobTitle}
          </p>
        </div>
      </div>

      {/* Update Button */}
      <div className="text-center md:text-left mt-6">
        <Link
          to={`/cardUser/${userId}`}
          className="bg-black text-white px-4 py-2 rounded-lg font-bold"
        >
          Mettr à jour votre Portfolio
        </Link>
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mt-4">
        <h1 className="text-black font-bold text-2xl mb-4 mt-12">
          Coordonnées:
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

      <div className="mt-4">
        {/* Bio Section */}
        {data.bio && (
          <div>
            <h3 className="text-xl font-bold text-black  mb-2 mt-6">
              A props:
            </h3>
            <p className="text-black font-semibold">{data.bio}</p>
          </div>
        )}
      </div>
      {/* Additional Content */}
      <div className="mt-12 space-y-6">
        {/* Social Media Links */}
        {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-black mb-4">
              Réseaux Sociaux
            </h3>
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

        {/* Video Section */}
        {data.videoUrl && (
          <div>
            <h3 className="text-xl font-bold text-black mb-2">Vidéo</h3>
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

      

        <div>
          {/* Portfolio Images */}
          {data.portfolioImages && data.portfolioImages.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-2">Images</h3>
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

          {/* Modal for viewing the clicked image */}
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
     {/* Footer */}
     <div className="mt-12">
     <footer className="border-t max-w-4xl rounded-t-lg mx-auto bg-black pt-4 mt-6 pb-4 text-center text-white">
     © {new Date().getFullYear()} My Informatique. All rights reserved.
   </footer>
     </div>
   </>
  );
};

export default Portfolio;














// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaLinkedin,
//   FaTwitter,
//   FaFacebook,
//   FaYoutube,
//   FaInstagram,
//   FaWhatsapp,
//   FaTiktok,
//   FaArrowLeft,
// } from "react-icons/fa";
// import { Link, useParams } from "react-router-dom";
// import YouTube from "react-youtube";

// const Portfolio = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { userId } = useParams();

//   useEffect(() => {
//     if (!userId) return;
//     const fetchFormData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/scanForm/${userId}`);
//         setData(response.data);
//       } catch (err) {
//         setError("Unable to retrieve data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFormData();
//   }, [userId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   const truncateUrl = (url, maxLength = 25) => {
//     return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
//   };
//   const extractYouTubeID = (url) => {
//     const match = url.match(
//       /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/embed\/)([^"&?/ ]{11})/
//     );
//     return match ? match[1] : null;
//   };
//   return (
//     <div className="max-w-4xl flex-1 mx-auto bg-white shadow-lg rounded-lg p-8">
//       {/* Back to Edit Form Button */}
//       <div className="absolute top-4 left-4">
//         <Link to={`/cardUser/${userId}`} className="text-black underline">
//           <FaArrowLeft className="mr-2" />
//         </Link>
//       </div>
//       {/* Sidebar - Profile Image and Contact */}
//       <div className=" text-center md:border-r md:pr-8">
//         <img
//           src={data.imageUrl}
//           alt="Profile"
//           className="w-36 h-36 mx-auto mb-4 rounded-full object-cover border"
//         />
//         <h2 className="text-2xl font-semibold text-gray-900">
//           {data.firstName} {data.lastName}
//         </h2>
//         <p className="text-lg text-gray-600 mt-2">{data.jobTitle}</p>
//         <div className="mt-4 text-gray-600 space-y-2">
//           {data.email && (
//             <div className="flex items-center justify-center">
//               <FaEnvelope className="text-blue-500 mr-2" />
//               <span>{data.email}</span>
//             </div>
//           )}
//           {data.address && (
//             <div className="flex items-center justify-center">
//               <FaMapMarkerAlt className="text-red-500 mr-2" />
//               <span>{data.address}</span>
//             </div>
//           )}
//           {data.website && (
//             <div className="flex items-center justify-center">
//               <FaGlobe className="text-green-500 mr-2" />
//               <a
//                 href={data.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 text-lg font-semibold"
//               >
//                 {truncateUrl(data.website)}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="md:pl-8 space-y-6">
//         {/* About Section */}
//         {data.bio && (
//           <div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2 mt-6">
//               A props:
//             </h3>
//             <p className="text-gray-700">{data.bio}</p>
//           </div>
//         )}

//         {/* Social Media Links */}
//         {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
//           <div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">
//               Réseaux Sociaux
//             </h3>
//             <div className="flex gap-4">
//               {data.socialLinks.linkedin && (
//                 <a href={data.socialLinks.linkedin} target="_blank">
//                   <FaLinkedin className="text-blue-700 text-3xl" />
//                 </a>
//               )}
//               {data.socialLinks.twitter && (
//                 <a href={data.socialLinks.twitter} target="_blank">
//                   <FaTwitter className="text-blue-400 text-3xl" />
//                 </a>
//               )}
//               {data.socialLinks.facebook && (
//                 <a href={data.socialLinks.facebook} target="_blank">
//                   <FaFacebook className="text-blue-600 text-3xl" />
//                 </a>
//               )}
//               {data.socialLinks?.youtube && (
//                 <a
//                   href={data.socialLinks.youtube}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaYoutube className="text-red-600 text-4xl" />
//                 </a>
//               )}
//               {data.socialLinks?.instagram && (
//                 <a
//                   href={data.socialLinks.instagram}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaInstagram className="text-pink-600 text-4xl" />
//                 </a>
//               )}
//               {data.socialLinks?.whatsapp && (
//                 <a
//                   href={data.socialLinks.whatsapp}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaWhatsapp className="text-green-500 text-4xl" />
//                 </a>
//               )}
//               {data.socialLinks?.tiktok && (
//                 <a
//                   href={data.socialLinks.tiktok}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FaTiktok className="text-black text-4xl" />
//                 </a>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Video Section */}
//         {/* {data.videoUrl && (
//           <div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">Video</h3>
//             <div className="aspect-w-16 aspect-h-9">
//               <YouTube
//               videoUrl={data.videoUrl}
//                 src={`https://www.youtube.com/embed/${new URL(
//                   data.videoUrl
//                 ).searchParams.get("v")}`}
//                 opts={{
//                   width: '100%',
//                   height: '315',
//                   playerVars: {
//                     autoplay: 0,
//                     controls: 1,
//                     modestbranding: 1,
//                   },
//                 }}
//               />
//             </div>
//           </div>
//         )} */}
//         {data.videoUrl && (
//           <div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">Video</h3>
//             <div className="aspect-w-16 aspect-h-9">
//               <YouTube
//                 videoId={extractYouTubeID(data.videoUrl)}
//                 opts={{
//                   width: "100%",
//                   playerVars: {
//                     autoplay: 0,
//                     controls: 1,
//                     modestbranding: 1,
//                   },
//                 }}
//                 className="rounded-lg shadow-md"
//               />
//             </div>
//           </div>
//         )}

//         {/* Portfolio Images */}
//         {data.portfolioImages && data.portfolioImages.length > 0 && (
//           <div>
//             <h3 className="text-xl font-bold text-gray-700 mb-2">Images</h3>
//             <div className="grid grid-cols-3 gap-4">
//               {data.portfolioImages.map((imageUrl, index) => (
//                 <div
//                   key={index}
//                   className="relative w-full h-32 overflow-hidden"
//                 >
//                   <img
//                     src={imageUrl}
//                     alt={`Portfolio ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Footer Section */}
//       <footer className="border-t pt-4 mt-6 text-center text-gray-500">
//         © {new Date().getFullYear()} My Informatique. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Portfolio;



