const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
