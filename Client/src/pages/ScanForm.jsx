import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instagram from "../assets/images/instagram.png";
import whatsapp from "../assets/images/whatsapp.png";
import linkedin from "../assets/images/linkedin.png";
import youtube from "../assets/images/youtube.png";
import tictoc from "../assets/images/tic-tac.png";
import facebook from "../assets/images/facebook.png";
import twitter from "../assets/images/reseaux-sociaux.png";
import Select from "react-select";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Upload, message, Button } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import YouTube from "react-youtube";

const socialMediaOptions = [
  { value: "instagram", label: "Instagram", logo: instagram },
  { value: "whatsapp", label: "WhatsApp", logo: whatsapp },
  { value: "linkedin", label: "LinkedIn", logo: linkedin },
  { value: "youtube", label: "YouTube", logo: youtube },
  { value: "tictoc", label: "Tic-Toc", logo: tictoc },
  { value: "facebook", label: "Facebook", logo: facebook },
  { value: "twitter", label: "Twitter", logo: twitter },
];

import {
  faEnvelope,
  faMapMarkerAlt,
  faGlobe,
  faUser,
  faBuilding,
  faBriefcase,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const ScanForm = () => {
  const { userId } = useParams();
  console.log("userIdscan:", userId);
  const [ready, setReady] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState("");
  const [videoID, setVideoID] = useState(null);

  const [redirect, setRedirect] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    bio: "",
    socialLinks: {},
    selectedSocials: "instagram",
    videoUrl: "",
    imageUrl: "",
    portfolioImages: [],
    portfolioUrl: "",
    portfolioTitle: "",
portfolioDescription: "",
portfolioImage: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isVideoAdded, setIsVideoAdded] = useState(false);

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const response = await axios.get(`/scanForm/${userId}`);
        if (response.data) {
          setFormData(response.data);
          setImageUrl(response.data.imageUrl);
          // setPortfolioImages(response.data.portfolioImage);
        }
        console.log("response:", response);
        // if (response.data.videoUrl) {
        //   const id = extractVideoID(response.data.videoUrl);
        //   if (id) {
        //     setVideoID(id);
        //     setIsVideoAdded(true);
        //   }
        // }
        console.log("response:", response);
      } catch (error) {
        console.error("Error fetching existing data:", error);
      }
    };

    fetchExistingData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isUpdate = Boolean(formData._id);
      console.log("isUpdate:", isUpdate);
      const apiUrl = isUpdate
        ? `/scanForm/${formData._id}`
        : `/scanForm/${userId}`;
      const method = isUpdate ? "PUT" : "POST";
      const dataToSubmit = {
        ...formData,
        imageUrl: formData.imageUrl,
        portfolioImages: formData.portfolioImages,
        portfolioImage: formData.portfolioImage,
      };

      const response = await axios({
        method: method,
        url: apiUrl,
        data: dataToSubmit,
      });

      setReady(response.data);

      if (response.status === 200 || response.status === 201) {
        setReady(response.data);
        setRedirect(true);
      } else {
        console.error("Error submitting form", response.data);
      }
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeWithWordLimit = (e) => {
    const { value, name } = e.target;
    const wordCount = value.split(' ').filter(word => word).length;
  
    // Update only if the word count is less than or equal to 100
    if (wordCount <= 20) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePhoneChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 5)); 
  };

  const handleSkipPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 5)); // Skip current page
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Limit to 1 page
  };

  const handleSocialChange = (selectedOption) => {
    setFormData({
      ...formData,
      selectedSocials: selectedOption,
      socialURL: "", // Clear URL when changing social option
    });
  };

  const handleSocialURLChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialURL: value,
    }));
  };

  const handleAddSocialLink = () => {
    const { selectedSocials, socialURL, socialLinks } = formData;
    if (selectedSocials && socialURL) {
      const socialKey = selectedSocials.value;
      setFormData((prevData) => ({
        ...prevData,
        socialLinks: {
          ...socialLinks,
          [socialKey]: socialURL,
        },
        socialURL: "", // Clear the input after adding
      }));
    }
  };

  const customOption = ({ label, logo }) => (
    <div className="flex items-center">
      <img src={logo} alt={label} className="w-6 h-6 mr-2" />
      {label}
    </div>
  );

  const truncateUrl = (url, maxLength = 25) => {
    return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
  };

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
    }

    if (info.file.status === "done") {
      const imageUrl = info.file.response.secure_url;

      // Set imageUrl to trigger rerender
      setImageUrl(imageUrl);

      // Update formData if necessary for consistency
      setFormData((prevData) => ({ ...prevData, imageUrl }));

      message.success(`${info.file.name} fichier téléchargé avec succès`);
      setUploading(false);
    } else if (info.file.status === "error") {
      console.error(
        "Erreur de téléchargement:",
        info.file.error,
        info.file.response
      );
      message.error(`${info.file.name} échec du téléchargement du fichier.`);
      setUploading(false);
    }
  };

  const uploadProps = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dltbbvgop/image/upload",
    data: {
      upload_preset: "Myinfo",
    },
    showUploadList: false,
    onChange: handleUploadChange,
  };

  const handleDeleteImage = () => {
    setImageUrl(""); // Clear the displayed image URL
    setFormData({ imageUrl: "" });
    setFormData((prevData) => ({ ...prevData, imageUrl: "" })); // Clear the formData URL if necessary
    message.success("Image removed successfully");
  };
 

  const handleUploadedChange = (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
    }

    if (info.file.status === "done") {
      const imagesUrl = info.file.response.secure_url;
      console.log("imagesUrl:", imagesUrl);

      setFormData((prev) => ({
        ...prev,
        portfolioImages: [...prev.portfolioImages, imagesUrl],
      }));

      message.success(`${info.file.name} fichier téléchargé avec succès`);
      setUploading(false);
    } else if (info.file.status === "error") {
      console.error(
        "Erreur de téléchargement:",
        info.file.error,
        info.file.response
      );
      message.error(`${info.file.name} échec du téléchargement du fichier.`);
      setUploading(false);
    }
  };

  const handleDeletePortfolioImage = () => {
    setImageUrl(""); // Clear the displayed image URL
    setFormData({ portfolioUrl: "" });
    setFormData((prevData) => ({ ...prevData, portfolioUrl: "" })); // Clear the formData URL if necessary
    message.success("Image removed successfully");
  };

  const uploadProp = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dltbbvgop/image/upload",
    data: {
      upload_preset: "Myinfo",
    },
    showUploadList: false,
    onChange: handleUploadedChange,
    multiple: true,
  };


  const handleDeleteImages = (index) => {
    const updatedImages = formData.portfolioImages.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      portfolioImages: updatedImages,
    }));
    console.log("updatedImages:", updatedImages);
    message.success("Image removed successfully");
  };

  const handleAddVideo = () => {
    const id = extractYouTubeID(formData.videoUrl);
    if (id) {
      setVideoID(id);
      setIsVideoAdded(true);
      setFormData({ ...formData });
    } else {
      alert("Please enter a valid YouTube URL");
      setIsVideoAdded(false);
    }
  };

  const extractYouTubeID = (url) => {
    // Matches common YouTube URL formats and extracts video ID
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube.com\/embed\/)([^"&?/ ]{11})/
    );
    return match ? match[1] : null;
  };


  const handleUploadPortfolioChange = (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
    }

    if (info.file.status === "done") {
      const portfolioImage = info.file.response.secure_url;

      // Set imageUrl to trigger rerender
      setPortfolioImages(portfolioImage);

      // Update formData if necessary for consistency
      setFormData((prevData) => ({ ...prevData, portfolioImage }));

      message.success(`${info.file.name} fichier téléchargé avec succès`);
      setUploading(false);
    } else if (info.file.status === "error") {
      console.error(
        "Erreur de téléchargement:",
        info.file.error,
        info.file.response
      );
      message.error(`${info.file.name} échec du téléchargement du fichier.`);
      setUploading(false);
    }
  };

  const uploadPro = {
    name: "file",
    action: "https://api.cloudinary.com/v1_1/dltbbvgop/image/upload",
    data: {
      upload_preset: "Myinfo",
    },
    showUploadList: false,
    onChange: handleUploadPortfolioChange,
  };

  if (redirect) {
    return <Navigate to={`/cardInfo/${userId}`} />;
  }

  return (
    <>
      <div className="flex p-2 mt-4 justify-between items-center">
        <button
          type="button"
          onClick={handlePrevPage}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
        >
          &#10094; Back
        </button>
        <button
          type="button"
          onClick={handleSkipPage}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-yellow-400"
        >
          Skip
        </button>
      </div>
      <div className="flex justify-center mt-8 items-center p-2">
        <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-2xl">
          {currentPage === 1 && (
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Informations Personnelles
              </h3>
              <p className="mb-4 text-gray-600">
                Renseignez vos informations de profil ou modifiez-les pour les
                tenir à jour
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    {formData.imageUrl ? (
                      <div className="relative">
                        <img
                          src={formData.imageUrl}
                          alt="Uploaded"
                          className="w-48 h-48 mb-4 border border-gray-300 rounded-md object-cover"
                        />
                        <Button
                          icon={<DeleteOutlined />}
                          danger
                          onClick={handleDeleteImage}
                          className="absolute top-1 right-1"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center mb-6">
                        <span className="mb-2 text-gray-500">📁</span>
                        <span className="text-gray-500">Télécharger image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />} loading={uploading}>
                        Upload
                      </Button>
                    </Upload>
                  </div>
                </div>
                <div className="flex gap-4 mb-4 mt-6">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium"
                    >
                      Prénom
                    </label>
                    <div className="mb-6 gap-2 flex">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="mt-2 text-gray-500"
                      />
                      <div className="w-full">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                          placeholder="Votre prénom"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium"
                  >
                    Nom de Famille
                  </label>
                  <div className="mb-6 flex items-center">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-gray-500"
                    />
                    <div className="w-full">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                        required
                        placeholder="Votre Nom"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="company"
                    className="block mb-2 text-sm font-medium"
                  >
                    Entreprise
                  </label>
                  <div className="mb-8 flex items-center">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="mr-2 text-gray-500"
                    />
                    <div className="w-full">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                        required
                        placeholder="Votre entreprise"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="jobTitle"
                    className="block mb-2 text-sm font-medium"
                  >
                    Intitulé de Poste
                  </label>
                  <div className="mb-8 flex items-center">
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="mr-2 text-gray-500"
                    />
                    <div className="w-full">
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                        placeholder="Votre intitulé de poste"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-8 mt-4">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium"
                  >
                    Numéro de Téléphone
                  </label>
                  <PhoneInput
                    type="tel"
                    id="phone"
                    country={"ma"}
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputClass="border border-gray-300 p-2 rounded text-sm w-full"
                    buttonClass="border border-gray-300 rounded-l"
                    required
                  />
                </div>
              </form>
            </div>
          )}

          {currentPage === 2 && (
            <div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="mb-8 text-gray-600">
                Please provide your contact details:
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-8 flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 text-gray-500"
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                    required
                    placeholder="Votre email"
                  />
                </div>

                <div className="mb-8 flex items-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="mr-2 text-gray-500"
                  />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                    required
                    placeholder="Votre adresse"
                  />
                </div>

                <div className="mb-6 mt-6 flex items-center">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="mr-2 text-gray-500"
                  />
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                    placeholder="Votre site web"
                  />
                </div>
              </form>
            </div>
          )}
           {currentPage === 3 && (
    <div>
      <h3 className="text-2xl font-bold mb-2">Portfolio Information</h3>
      <p className="mb-4 text-gray-600">Upload your portfolio details below</p>
      
      <form onSubmit={handleSubmit}>
        {/* Flex container for Image Upload and Portfolio Details */}
        <div className="flex items-start gap-8">
          
          {/* Left: Image Upload Section */}
          <div className="flex flex-col items-center">
            {formData.portfolioImage ? (
              <div className="relative">
                <img
                  src={formData.portfolioImage}
                  alt="Uploaded"
                  className="w-32 h-32 mb-4 border border-gray-300 rounded-md object-cover"
                />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={handleDeletePortfolioImage}
                  className="absolute top-1 right-1"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center mb-6">
                <span className="mb-2 text-gray-500">📁</span>
                <span className="text-gray-500">Portfolio Image</span>
              </div>
            )}

            {/* Upload Button */}
            <Upload {...uploadPro}>
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload
              </Button>
            </Upload>
          </div>
          
          {/* Right: Portfolio URL, Title, and Description */}
          <div className="flex-1">
            {/* Portfolio URL */}
            <div className="mb-4">
              <label htmlFor="portfolioUrl" className="block mb-2 text-sm font-medium">
                Portfolio URL
              </label>
              <input
                type="text"
                id="portfolioUrl"
                name="portfolioUrl"
                value={formData.website}
                onChange={handleChange}
                className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                placeholder="https://yourportfolio.com"
               
              />
            </div>

            {/* Portfolio Title */}
            <div className="mb-4">
              <label htmlFor="portfolioTitle" className="block mb-2 text-sm font-medium">
                Portfolio Title
              </label>
              <input
                type="text"
                id="portfolioTitle"
                name="portfolioTitle"
                value={formData.portfolioTitle}
                onChange={handleChange}
                className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                placeholder="Your Portfolio Title"
               
              />
            </div>

            {/* Portfolio Description */}
            <div className="mb-4">
              <label htmlFor="portfolioDescription" className="block mb-2 text-sm font-medium">
                Portfolio Description
              </label>
              <textarea
                id="portfolioDescription"
                name="portfolioDescription"
                value={formData.portfolioDescription}
                onChange={handleChangeWithWordLimit}
                className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                placeholder="Describe your portfolio"
                rows="3"
              
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )}

          {currentPage === 4 && (
            <div>
              <h3 className="text-2xl font-bold mb-2">À Propos de Vous</h3>
              <p className="mb-4 text-gray-600">
                Veuillez télécharger les photos de votre société pour mettre en
                valeur votre portfolio.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-start">
                  <div className="w-full">
                    <div className="flex gap-2">
                      <label
                        htmlFor="bio"
                        className="flex mt-2 mb-4 text-sm font-medium"
                      >
                        À Propos
                      </label>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="mb-2 text-gray-500 mt-2"
                      />
                    </div>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="border border-gray-300 p-4 w-full rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      rows="16"
                      placeholder="Décrivez-vous brièvement..."
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Télécharger Images
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Renseignez vos informations de profil ou modifiez-les pour
                    les tenir à jour
                  </p>

                  {/* Display uploaded images */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {formData.portfolioImages.length > 0 ? (
                      formData.portfolioImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Portfolio ${index + 1}`}
                            className="mb-2 h-24 w-24 object-cover rounded-lg"
                          />
                          <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => handleDeleteImages(index)}
                            className="absolute top-1 right-1"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="bg-gray-200 h-24 flex items-center justify-center rounded-lg text-gray-500">
                        No images uploaded
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Upload {...uploadProp}>
                      <Button icon={<UploadOutlined />} loading={uploading}>
                        Upload
                      </Button>
                    </Upload>
                  </div>
                </div>
              </form>
            </div>
          )}

          {currentPage === 5 && (
            <div>
              <h3 className="text-xl font-bold mb-2">Add Social Links</h3>
              <p className="mb-4 text-gray-600">
                Add your social media links below:
              </p>
              <div className="mb-4">
                <Select
                  options={socialMediaOptions}
                  value={formData.selectedSocials}
                  onChange={handleSocialChange}
                  getOptionLabel={customOption}
                  getOptionValue={(option) => option.value}
                  placeholder="Select a social media"
                  className="mb-2"
                />
                <input
                  type="url"
                  placeholder="Enter URL"
                  value={formData.socialURL}
                  onChange={handleSocialURLChange}
                  className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>

              {/* Display added social links with logos */}
              <div>
                <h4 className="text-lg font-bold">Added Links:</h4>
                <ul className="mt-2">
                  {Object.entries(formData.socialLinks).map(([key, url]) => (
                    <li key={key} className="flex items-center mb-2">
                      <img
                        src={
                          socialMediaOptions.find(
                            (option) => option.value === key
                          ).logo
                        }
                        alt={key}
                        className="w-6 h-6 mr-2"
                      />
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {truncateUrl(url)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 mt-12">
                <h3 className="text-xl font-bold mb-2">Add YouTube Video</h3>
                <input
                  type="url"
                  placeholder="Enter YouTube Video URL"
                  value={formData.videoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, videoUrl: e.target.value })
                  }
                  className="border-0 border-b border-gray-500 p-1 w-full text-sm placeholder-gray-700 focus:outline-none focus:border-b-2 focus:border-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                >
                  Add Video
                </button>

                {isVideoAdded && videoID && (
                  <div className="mt-4">
                    <div className="flex justify-center mt-4">
                      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                        <YouTube
                          videoId={videoID}
                          opts={{
                            width: "100%",
                            height: "315",
                            playerVars: {
                              autoplay: 0,
                              controls: 1,
                              modestbranding: 1,
                            },
                          }}
                          className="youtube-video"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-12">
            {currentPage < 5 ? (
              <button
                type="button"
                onClick={handleNextPage}
                className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanForm;
