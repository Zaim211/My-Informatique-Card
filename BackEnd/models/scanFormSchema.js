const mongoose = require("mongoose");

// Define the schema for the form
const scanFormSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Assuming userId refers to the user's ObjectId
      ref: "User", // Reference to the User model
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    company: {
      type: String,
  
    },
    jobTitle: {
      type: String,
  
    },
    phone: {
      type: String,

    },
    email: {
      type: String,

      match: /.+\@.+\..+/,
    },
    website: {
      type: String,
      default: "",
    },
    address: {
      type: String,
   
    },
    bio: {
      type: String,
      default: "",
    },
    // socialLinks: {type:[String]},
    socialLinks: {
      type: Map, // Using Map to define an object-like structure
      of: String, // Each key in the map will be a string (URL)
      default: {}, // Default to an empty object
    },
    imageUrl: { type: String },
    videoUrl: { type: String },
    portfolioImages: { type: [String] },
  },
  { timestamps: true }
);

const ScanForm = mongoose.model("ScanForm", scanFormSchema);

module.exports = ScanForm;
