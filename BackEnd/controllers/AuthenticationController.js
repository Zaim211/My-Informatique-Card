// const nodemailer = require("nodemailer"); // For sending emails
// const Client = require("../models/clientSchema"); // Your User model
// const crypto = require("crypto");
// const bcrypt = require("bcrypt");
// const ScanForm = require("../models/scanFormSchema");
// const path = require('path');
// const fs = require('fs');


// class AuthenticationController {
//   // static async register(req, res) {
//   //   const { email, password } = req.body;

//   //   try {
//   //     // Check if the user already exists
//   //     const existingUser = await Client.findOne({ email });
//   //     if (existingUser) {
//   //       return res.status(400).json({ message: "L'utilisateur existe déjà." });
//   //     }

//   //     // Hash the password before saving
//   //     const hashedPassword = await bcrypt.hash(password, 10);

//   //     // Create a new user with a verification token
//   //     const user = new Client({
//   //       email,
//   //       password: hashedPassword, // Use the hashed password
//   //       isVerified: false,
//   //       verificationToken: crypto.randomBytes(32).toString("hex"), // Generate a verification token
//   //     });

//   //     // Debugging: Check the user object
//   //     console.log("user before saving:", user);

//   //     await user.save();

      

//   //     // Send verification email
//   //     const transporter = nodemailer.createTransport({
//   //       service: "Gmail", // Or your email service
//   //       auth: {
//   //         user: process.env.EMAIL_USER,
//   //         pass: process.env.EMAIL_PASS,
//   //       },
//   //     });

//   //     // Include the verification token in the URL
//   //     const verificationUrl = `${req.protocol}://${req.get("host")}/verify/${
//   //       user.verificationToken
//   //     }`;
//   //     console.log("verificationUrl", verificationUrl);

//   //     await transporter.sendMail({
//   //       to: user.email,
//   //       subject: "Vérification de votre compte",
//   //       html: `
//   //         <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//   //           <h2 style="color: #0056b3;">Bonjour,</h2>
//   //           <p>Merci de vous être inscrit sur notre plateforme. Pour compléter votre inscription, veuillez vérifier votre compte en cliquant sur le lien ci-dessous :</p>
//   //           <p style="text-align: center; margin: 20px 0;">
//   //             <a href="${verificationUrl}" style="background-color: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
//   //               Vérifiez votre compte
//   //             </a>
//   //           </p>
//   //           <p>Si vous n'avez pas initié cette inscription, vous pouvez ignorer cet e-mail en toute sécurité.</p>
//   //           <br>
//   //           <p style="font-size: 14px; color: #888;">Cordialement,<br>L'équipe de Support</p>
//   //         </div>
//   //       `,
//   //     });
      

//   //     res.status(201).json({
//   //       message: "Veuillez vérifier votre email pour activer votre compte.",
//   //     });
//   //   } catch (error) {
//   //     console.error("Erreur lors de l'inscription :", error);
//   //     res
//   //       .status(500)
//   //       .json({ message: "Une erreur est survenue lors de l'inscription." });
//   //   }
//   // }
//   static async register(req, res) {
//     const { email, password } = req.body;

//     try {
//         // Check if the user already exists
//         const existingUser = await Client.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "L'utilisateur existe déjà." });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user with a verification token
//         const user = new Client({
//             email,
//             password: hashedPassword,
//             isVerified: false,
//             verificationToken: crypto.randomBytes(32).toString("hex"),
//         });

//         await user.save();

//         // Generate a unique QR code ID
//         const qrId = crypto.randomBytes(16).toString("hex"); // Generates a random ID for the QR code
//         const qrCodeData = `http://yourfrontendurl.com/register?qrId=${qrId}`; // URL that will be encoded in the QR

//         // Generate the QR code and save it as an image
//         const qrImagePath = path.join(__dirname, 'qrCodes', `${qrId}.png`); // Directory for QR images

//         // Ensure the directory exists
//         fs.mkdirSync(path.dirname(qrImagePath), { recursive: true });

//         // Generate the QR code image
//         await QRCodeGenerator.toFile(qrImagePath, qrCodeData);

//         // Create a new QR code linked to the user
//         await QRCode.create({ qrId, userId: user._id, qrImage: qrImagePath });

//         // Send verification email (as per your existing code)
//         const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const verificationUrl = `${req.protocol}://${req.get("host")}/verify/${user.verificationToken}`;
//         await transporter.sendMail({
//             to: user.email,
//             subject: "Vérification de votre compte",
//             html: `
//                 <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
//                     <h2 style="color: #0056b3;">Bonjour,</h2>
//                     <p>Merci de vous être inscrit sur notre plateforme. Pour compléter votre inscription, veuillez vérifier votre compte en cliquant sur le lien ci-dessous :</p>
//                     <p style="text-align: center; margin: 20px 0;">
//                         <a href="${verificationUrl}" style="background-color: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
//                             Vérifiez votre compte
//                         </a>
//                     </p>
//                     <p>Si vous n'avez pas initié cette inscription, vous pouvez ignorer cet e-mail en toute sécurité.</p>
//                     <br>
//                     <p style="font-size: 14px; color: #888;">Cordialement,<br>L'équipe de Support</p>
//                 </div>
//             `,
//         });

//         res.status(201).json({
//             message: "Veuillez vérifier votre email pour activer votre compte.",
//             qrId // Optionally, return the QR code ID for further use
//         });
//     } catch (error) {
//         console.error("Erreur lors de l'inscription :", error);
//         res.status(500).json({ message: "Une erreur est survenue lors de l'inscription." });
//     }
//   }

//   static async verify(req, res) {
//     try {
//       const { token } = req.params;

//       // Find the user by verification token
//       const user = await Client.findOne({ verificationToken: token });

//       if (!user) {
//         return res.status(400).json({ message: "Invalid verification token." });
//       }

//       // Update user status to verified
//       user.isVerified = true;
//       user.verificationToken = undefined; // Remove the token after verification
//       await user.save();

//       // Redirect to the front-end URL
//       res.redirect(`https://my-informatique-card.vercel.app/card/${user._id}`); // Adjust the URL as needed
//     } catch (error) {
//       console.error("Error verifying account:", error);
//       res
//         .status(500)
//         .json({ message: "An error occurred during verification." });
//     }
//   }

 
//     // Create (POST) - expects userId in the route parameter
//     static async scanFormClient(req, res) {
//       try {
//         const userId = req.params.userId;
//         const newForm = new ScanForm({
//           ...req.body,
//           userId,
//         });
//         await newForm.save();
//         res.status(201).json({
//           message: 'Form submitted successfully!',
//           form: newForm,
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({
//           message: 'An error occurred while submitting the form.',
//           error: error.message,
//         });
//       }
//     }
  
//     // Update (PUT) - expects _id of the form in the route parameter
//     static async updateForm(req, res) {
//       try {
//         const formId = req.params.id;
//         const updatedForm = await ScanForm.findByIdAndUpdate(
//           formId,
//           { ...req.body },
//           { new: true, runValidators: true }
//         );
//         if (!updatedForm) {
//           return res.status(404).json({ message: 'Form not found' });
//         }
//         res.json({
//           message: 'Form updated successfully!',
//           form: updatedForm,
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({
//           message: 'An error occurred while updating the form.',
//           error: error.message,
//         });
//       }
//     }
  
  

//   // static async scanFormClient(req, res) {
//   //   try {
//   //     // Extract userId from the route parameter
//   //     const userId = req.params.id;
  
//   //     // Create the form data, including the userId
//   //     const newForm = new ScanForm({
//   //       ...req.body,  // Spread the form data from the body
//   //       userId,       // Attach the userId to the form
//   //     });
  
//   //     // Save the new form in the database
//   //     await newForm.save();
  
//   //     // Respond with a success message
//   //     res.status(201).json({
//   //       message: 'Form submitted successfully!',
//   //       form: newForm,
//   //     });
//   //   } catch (error) {
//   //     // Handle any errors that occur during submission
//   //     console.error(error);
//   //     res.status(500).json({
//   //       message: 'An error occurred while submitting the form.',
//   //       error: error.message,
//   //     });
//   //   }
//   // }
//   // static async updateForm(req, res) {
//   //   try {
//   //     const userId = req.params.id;
  
//   //     const updatedForm = await ScanForm.findOneAndUpdate(
//   //       { userId },
//   //       { ...req.body },
//   //       { new: true, runValidators: true }
//   //     );
  
//   //     if (!updatedForm) {
//   //       return res.status(404).json({ message: 'Form not found' });
//   //     }
//   //     res.json({
//   //       message: 'Form updated successfully!',
//   //       form: updatedForm,
//   //     });
//   //   } catch (error) {
//   //     console.error(error);
//   //     res.status(500).json({
//   //       message: 'An error occurred while updating the form.',
//   //       error: error.message,
//   //     });
//   //   }
//   // }

//   static async getScanForm(req, res) {
//     try {

//       const formData = await ScanForm.findOne({ userId: req.params.id })
//       console.log('formData', formData);
//       if (!formData) return res.status(404).send("Data not found");
//       res.json(formData);
//     } catch (error) {
//       res.status(500).send("Server error");
//     }
//   }

// }

// module.exports = AuthenticationController;

const nodemailer = require("nodemailer"); // For sending emails
const Client = require("../models/clientSchema"); // Your User model
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const ScanForm = require("../models/scanFormSchema");
const jwt = require("jsonwebtoken");

class AuthenticationController {
  static async register(req, res) {
    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await Client.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "L'utilisateur existe déjà." });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with a verification token
      const user = new Client({
        email,
        password: hashedPassword, // Use the hashed password
        isVerified: false,
        verificationToken: crypto.randomBytes(32).toString("hex"), // Generate a verification token
      });

      // Debugging: Check the user object
      console.log("user before saving:", user);

      await user.save();

      

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: "Gmail", // Or your email service
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Include the verification token in the URL
      const verificationUrl = `${req.protocol}://${req.get("host")}/verify/${
        user.verificationToken
      }`;
      console.log("verificationUrl", verificationUrl);

      await transporter.sendMail({
        to: user.email,
        subject: "Vérification de votre compte",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #0056b3;">Bonjour,</h2>
            <p>Merci de vous être inscrit sur notre plateforme. Pour compléter votre inscription, veuillez vérifier votre compte en cliquant sur le lien ci-dessous :</p>
            <p style="text-align: center; margin: 20px 0;">
              <a href="${verificationUrl}" style="background-color: #0056b3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                Vérifiez votre compte
              </a>
            </p>
            <p>Si vous n'avez pas initié cette inscription, vous pouvez ignorer cet e-mail en toute sécurité.</p>
            <br>
            <p style="font-size: 14px; color: #888;">Cordialement,<br>L'équipe de Support</p>
          </div>
        `,
      });
      

      res.status(201).json({
        message: "Veuillez vérifier votre email pour activer votre compte.",
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      res
        .status(500)
        .json({ message: "Une erreur est survenue lors de l'inscription." });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await Client.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Identifiants invalides." });
      }
  
      // Check if the user is verified
      if (!user.isVerified) {
        return res.status(403).json({ message: "Votre compte n'est pas vérifié." });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Identifiants invalides." });
      }
  
      // Generate a token (you may want to use JWT)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });
  
      // Respond with the user details and token
      res.status(200).json({
        message: "Connexion réussie.",
        token,
        user: {
          id: user._id,
          email: user.email,
          // Include any other user fields you want to send back
        },
      });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).json({ message: "Une erreur est survenue lors de la connexion." });
    }
  }
  

  static async verify(req, res) {
    try {
      const { token } = req.params;

      // Find the user by verification token
      const user = await Client.findOne({ verificationToken: token });

      if (!user) {
        return res.status(400).json({ message: "Invalid verification token." });
      }

      // Update user status to verified
      user.isVerified = true;
      // user.verificationToken = undefined; // Remove the token after verification
      await user.save();

      // Redirect to the front-end URL
      res.redirect('http://localhost:5173/SignIn'); // Adjust the URL as needed
    } catch (error) {
      console.error("Error verifying account:", error);
      res
        .status(500)
        .json({ message: "An error occurred during verification." });
    }
  }

 
    // Create (POST) - expects userId in the route parameter
    static async scanFormClient(req, res) {
      try {
        const userId = req.params.userId;
        const newForm = new ScanForm({
          ...req.body,
          userId,
        });
        await newForm.save();
        res.status(201).json({
          message: 'Form submitted successfully!',
          form: newForm,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while submitting the form.',
          error: error.message,
        });
      }
    }
  
    // Update (PUT) - expects _id of the form in the route parameter
    static async updateForm(req, res) {
      try {
        const formId = req.params.id;
        const updatedForm = await ScanForm.findByIdAndUpdate(
          formId,
          { ...req.body },
          { new: true, runValidators: true }
        );
        if (!updatedForm) {
          return res.status(404).json({ message: 'Form not found' });
        }
        res.json({
          message: 'Form updated successfully!',
          form: updatedForm,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'An error occurred while updating the form.',
          error: error.message,
        });
      }
    }
  
  

  // static async scanFormClient(req, res) {
  //   try {
  //     // Extract userId from the route parameter
  //     const userId = req.params.id;
  
  //     // Create the form data, including the userId
  //     const newForm = new ScanForm({
  //       ...req.body,  // Spread the form data from the body
  //       userId,       // Attach the userId to the form
  //     });
  
  //     // Save the new form in the database
  //     await newForm.save();
  
  //     // Respond with a success message
  //     res.status(201).json({
  //       message: 'Form submitted successfully!',
  //       form: newForm,
  //     });
  //   } catch (error) {
  //     // Handle any errors that occur during submission
  //     console.error(error);
  //     res.status(500).json({
  //       message: 'An error occurred while submitting the form.',
  //       error: error.message,
  //     });
  //   }
  // }
  // static async updateForm(req, res) {
  //   try {
  //     const userId = req.params.id;
  
  //     const updatedForm = await ScanForm.findOneAndUpdate(
  //       { userId },
  //       { ...req.body },
  //       { new: true, runValidators: true }
  //     );
  
  //     if (!updatedForm) {
  //       return res.status(404).json({ message: 'Form not found' });
  //     }
  //     res.json({
  //       message: 'Form updated successfully!',
  //       form: updatedForm,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //       message: 'An error occurred while updating the form.',
  //       error: error.message,
  //     });
  //   }
  // }

  static async getScanForm(req, res) {
    try {

      const formData = await ScanForm.findOne({ userId: req.params.id })
      console.log('formData', formData);
      if (!formData) return res.status(404).send("Data not found");
      res.json(formData);
    } catch (error) {
      res.status(500).send("Server error");
    }
  }

}

module.exports = AuthenticationController;