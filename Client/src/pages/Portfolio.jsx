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
// } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// const Portfolio = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const { userId } = useParams();
//   console.log("userId:", userId);

//   useEffect(() => {
//     if (!userId) {
//       console.error("User ID not provided");
//       return;
//     }

//     const fetchFormData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`/scanForm/${userId}`);
//         console.log("responsedata:", response);
//         setData(response.data);
//         setImageUrl(response.data.imageUrl);
//         console.log("formData after set:", response.data);
//       } catch (err) {
//         setError("Unable to retrieve data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFormData();
//   }, []);

//   const truncateUrl = (url) => {
//     return url.length > 25 ? `${url.slice(0, 25)}...` : url;
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!data) return <div>No data found</div>;
//   return (
//     <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6">
//       {/* Header Section */}
//       <div className="flex gap-8 mb-12 items-center">
//         {/* Image, Upload, and Delete Section */}
//         <div className="flex flex-col items-center">
//           <img
//             src={imageUrl}
//             alt="Profile"
//             className="w-48 h-48 mb-4 border border-gray-300 rounded-full object-cover"
//           />
//         </div>

//         {/* Name and Job Title Section */}
//         <div className="flex flex-col justify-center">
//           <h2 className="text-3xl font-semibold text-black">
//             {data.firstName} {data.lastName}
//           </h2>
//           <p className="text-lg mt-2 text-gray-600">{data.jobTitle}</p>
//         </div>
//       </div>

//       {/* About Section */}
//       {data.bio && (
//         <div className="mb-6">
//           <h3 className="text-xl font-bold text-gray-700 mb-2">À propos</h3>
//           <p className="text-gray-900 font-semibold text-lg">{data.bio}</p>
//         </div>
//       )}

//       {/* Contact Section */}
//       {data.email || data.address || data.website ? (
//         <div className="mb-6">
//           <h3 className="text-xl font-bold text-gray-700 mb-2">Coordonnées</h3>
//           {data.email && (
//             <div className="flex items-center mb-2">
//               <FaEnvelope className="text-blue-500 mr-2" />
//               <span className="text-lg font-semibold">{data.email}</span>
//             </div>
//           )}
//           {data.address && (
//             <div className="flex items-center mb-2">
//               <FaMapMarkerAlt className="text-blue-500 mr-2" />
//               <span className="text-lg font-semibold">{data.address}</span>
//             </div>
//           )}
//           {data.website && (
//             <div className="flex items-center">
//               <FaGlobe className="text-blue-500 mr-2" />
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
//       ) : null}

//       {/* Social Media Section */}
//       {Object.keys(data.socialLinks || {}).length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             Réseaux Sociaux
//           </h3>
//           <div className="flex space-x-4">
//             {data.socialLinks?.linkedin && (
//               <a
//                 href={data.socialLinks.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaLinkedin className="text-blue-700 text-4xl" />
//               </a>
//             )}
//             {data.socialLinks?.twitter && (
//               <a
//                 href={data.socialLinks.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaTwitter className="text-blue-500 text-4xl" />
//               </a>
//             )}
//             {data.socialLinks?.facebook && (
//               <a
//                 href={data.socialLinks.facebook}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaFacebook className="text-blue-600 text-4xl" />
//               </a>
//             )}
//             {data.socialLinks?.youtube && (
//               <a
//                 href={data.socialLinks.youtube}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaYoutube className="text-red-600 text-4xl" />
//               </a>
//             )}
//             {data.socialLinks?.instagram && (
//               <a
//                 href={data.socialLinks.instagram}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaInstagram className="text-pink-600 text-4xl" />
//               </a>
//             )}
//             {data.socialLinks?.whatsapp && (
//               <a
//                 href={data.socialLinks.whatsapp}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaWhatsapp className="text-green-500 text-4xl" />
//               </a>
//             )}
//             {data.socialLinks?.tiktok && (
//               <a
//                 href={data.socialLinks.tiktok}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaTiktok className="text-black text-4xl" />
//               </a>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Videos Section */}
//       {data.videoUrl && (
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Videos</h3>
//           <div className="bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
//             <iframe
//               width="560"
//               height="315"
//               src={`https://www.youtube.com/embed/${new URL(
//                 data.videoUrl
//               ).searchParams.get("v")}`}
//               title="YouTube video"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}

//       {/* Images Section */}
//       {data.portfolioImages?.length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Images</h3>
//           <div className="flex flex-wrap gap-4">
//             {data.portfolioImages.map((imageUrl, index) => (
//               <div
//                 key={index}
//                 className="relative w-24 h-24 border rounded-lg overflow-hidden shadow-md"
//               >
//                 <img
//                   src={imageUrl}
//                   alt={`Uploaded image ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//       {/* Footer Section */}
//       <footer className="border-t pt-4 mt-6 text-center text-gray-500">
//         © {new Date().getFullYear()} My Informatique. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Portfolio;
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
import { useParams } from "react-router-dom";

const Portfolio = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();

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

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:flex">
      {/* Sidebar - Profile Image and Contact */}
      <div className="md:w-1/3 text-center md:border-r md:pr-8">
        <img
          src={data.imageUrl}
          alt="Profile"
          className="w-36 h-36 mx-auto mb-4 rounded-full object-cover border"
        />
        <h2 className="text-2xl font-semibold text-gray-900">
          {data.firstName} {data.lastName}
        </h2>
        <p className="text-lg text-gray-600 mt-2">{data.jobTitle}</p>
        <div className="mt-4 text-gray-600 space-y-2">
          {data.email && (
            <div className="flex items-center justify-center">
              <FaEnvelope className="text-blue-500 mr-2" />
              <span>{data.email}</span>
            </div>
          )}
          {data.address && (
            <div className="flex items-center justify-center">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span>{data.address}</span>
            </div>
          )}
          {data.website && (
  <div className="flex items-center justify-center">
    <FaGlobe className="text-green-500 mr-2" />
    <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-lg font-semibold">
      {truncateUrl(data.website)}
    </a>
  </div>
)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:w-2/3 md:pl-8 space-y-6">
        {/* About Section */}
        {data.bio && (
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">A props:</h3>
            <p className="text-gray-700">{data.bio}</p>
          </div>
        )}

        {/* Social Media Links */}
        {data.socialLinks && Object.keys(data.socialLinks).length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Réseaux Sociaux</h3>
            <div className="flex gap-4">
              {data.socialLinks.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank">
                  <FaLinkedin className="text-blue-700 text-3xl" />
                </a>
              )}
              {data.socialLinks.twitter && (
                <a href={data.socialLinks.twitter} target="_blank">
                  <FaTwitter className="text-blue-400 text-3xl" />
                </a>
              )}
              {data.socialLinks.facebook && (
                <a href={data.socialLinks.facebook} target="_blank">
                  <FaFacebook className="text-blue-600 text-3xl" />
                </a>
              )}
                          {data.socialLinks?.youtube && (
              <a
                href={data.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-red-600 text-4xl" />
              </a>
            )}
            {data.socialLinks?.instagram && (
              <a
                href={data.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-pink-600 text-4xl" />
              </a>
            )}
            {data.socialLinks?.whatsapp && (
              <a
                href={data.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-green-500 text-4xl" />
              </a>
            )}
            {data.socialLinks?.tiktok && (
              <a
                href={data.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="text-black text-4xl" />
              </a>
            )}
            </div>
          </div>
        )}

        {/* Video Section */}
        {data.videoUrl && (
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Video</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${new URL(
                  data.videoUrl
                ).searchParams.get("v")}`}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
                className="w-full rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        )}

        {/* Portfolio Images */}
        {data.portfolioImages && data.portfolioImages.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {data.portfolioImages.map((imageUrl, index) => (
                <div key={index} className="relative w-full h-32 overflow-hidden">
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
      </div>
             {/* Footer Section */}
       <footer className="border-t pt-4 mt-6 text-center text-gray-500">
         © {new Date().getFullYear()} My Informatique. All rights reserved.
       </footer>
    </div>
  );
};

export default Portfolio;
