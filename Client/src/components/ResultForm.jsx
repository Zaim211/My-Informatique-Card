// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FaUser,
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


// const ResultForm = ({ userId }) => {
//   const [formData, setFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
  

//   useEffect(() => {
//     if (!userId) return;

//     const fetchFormData = async () => {
//       try {
//         console.log(`Fetching data for userId: ${userId}`);
//         const response = await axios.get(`/scanForm/${userId}`);
//         console.log('response:', response);
//         setFormData(response.data);
//         setImageUrl(response.data.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
//       } catch (err) {
//         setError("Unable to retrieve data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFormData();
//   }, [userId]);



//   //   if (!userId) return;

//   //   const fetchFormData = async () => {
//   //     try {
//   //       const response = await axios.get(`/scanForm/${userId}`);
//   //       setFormData(response.data);
//   //     } catch (err) {
//   //       setError("Unable to retrieve data");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchFormData();
//   // }, [userId]);

//   const truncateUrl = (url) => {
//     return url.length > 25 ? `${url.slice(0, 25)}...` : url;
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg p-6">
//       {/* Header Section */}
//       <div className="flex gap-8 mb-12 items-center">
//   {/* Image, Upload, and Delete Section */}
//   <div className="flex flex-col items-center">
//     <img
//       src={imageUrl}
//       alt="Profile"
//       className="w-48 h-48 mb-4 border border-gray-300 rounded-full object-cover"
//     />
//     {/* <div className="flex gap-2">
//   <Upload {...uploadProps}>
//       <Button icon={<UploadOutlined />} loading={uploading}>
//         Upload
//       </Button>
//       </Upload>
//       <Button
//         icon={<DeleteOutlined />}
//         danger
//         onClick={handleDeleteImage}
//       >
//         Delete
//       </Button>
//     </div> */}
//   </div>

//   {/* Name and Job Title Section */}
//   <div className="flex flex-col justify-center">
//     <h2 className="text-3xl font-semibold text-black">
//       {formData.firstName} {formData.lastName}
//     </h2>
//     <p className="text-lg mt-2 text-gray-600">{formData.jobTitle}</p>
//   </div>
// </div>


//       {/* About Section */}
//       <div className="mb-6">
//         <h3 className="text-xl font-bold text-gray-700 mb-2">À propos</h3>
//         <p className="text-gray-900 font-semibold text-lg">{formData.bio}</p>
//       </div>

//       {/* Contact Section */}
//       <div className="mb-6">
//         <h3 className="text-xl font-bold text-gray-700 mb-2">
//           Coordonnées
//         </h3>
//         <div className="flex items-center mb-2">
//           <FaEnvelope className="text-blue-500 mr-2" />
//           <span className="text-lg font-semibold">{formData.email}</span>
//         </div>
//         <div className="flex items-center mb-2">
//           <FaMapMarkerAlt className="text-blue-500 mr-2" />
//           <span className="text-lg font-semibold">{formData.address}</span>
//         </div>
//         <div className="flex items-center">
//           <FaGlobe className="text-blue-500 mr-2" />
//           <a
//             href={formData.website}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 text-lg font-semibold"
//           >
//             {truncateUrl(formData.website)}
//           </a>
//         </div>
//       </div>

//       {/* Social Media Section */}
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//           Réseaux Sociaux
//         </h3>
//         <div className="flex space-x-4">
//           {formData.socialLinks?.linkedin && (
//             <a
//               href={formData.socialLinks.linkedin}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaLinkedin className="text-blue-700 text-4xl" />
//             </a>
//           )}
//           {formData.socialLinks?.twitter && (
//             <a
//               href={formData.socialLinks.twitter}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaTwitter className="text-blue-500 text-4xl" />
//             </a>
//           )}
//           {formData.socialLinks?.facebook && (
//             <a
//               href={formData.socialLinks.facebook}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaFacebook className="text-blue-600 text-4xl" />
//             </a>
//           )}
//           {formData.socialLinks?.youtube && (
//             <a
//               href={formData.socialLinks.youtube}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaYoutube className="text-red-600 text-4xl" />
//             </a>
//           )}
//           {formData.socialLinks?.instagram && (
//             <a
//               href={formData.socialLinks.instagram}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaInstagram className="text-pink-600 text-4xl" />
//             </a>
//           )}
//           {formData.socialLinks?.whatsapp && (
//             <a
//               href={formData.socialLinks.whatsapp}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaWhatsapp className="text-green-500 text-4xl" />
//             </a>
//           )}
//           {formData.socialLinks?.tiktok && (
//             <a
//               href={formData.socialLinks.tiktok}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaTiktok className="text-black text-4xl" />
//             </a>
//           )}
//         </div>
//       </div>

//      {/* Videos Section */}
//      <div className="mb-6">
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">Videos</h3>
//         <div className="bg-gray-200 flex items-center justify-center rounded-lg text-gray-500">
//           {formData.videoUrl ? (
//             <iframe
//               width="560"
//               height="315"
//               src={`https://www.youtube.com/embed/${new URL(formData.videoUrl).searchParams.get("v")}`}
//               title="YouTube video"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <div className="h-24 flex items-center justify-center">
//               Video Placeholder
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Images Section */}
//       <div className="mb-6">
//   <h3 className="text-xl font-semibold text-gray-700 mb-2">Images</h3>
//   <div className="flex flex-wrap gap-4">
//     {formData.portfolioImages.length > 0 ? (
//       formData.portfolioImages.map((imageUrl, index) => (
//         <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden shadow-md">
//           <img
//             src={imageUrl}
//             alt={`Uploaded image ${index + 1}`}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       ))
//     ) : (
//       <div className="bg-gray-200 h-24 flex items-center justify-center rounded-lg text-gray-500">
//         No images uploaded
//       </div>
//     )}
//   </div>
// </div>

//       {/* Footer Section */}
//       <footer className="border-t pt-4 mt-6 text-center text-gray-500">
//         © {new Date().getFullYear()} My Informatique. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default ResultForm;
