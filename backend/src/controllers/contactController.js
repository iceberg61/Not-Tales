const ContactMessage = require("../models/ContactMessage");
const AppError = require("../utils/AppError");
const { sendContactNotificationEmail, sendContactConfirmationEmail } = require("../services/emailService");

// POST /api/contact
exports.submitContactForm = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      throw new AppError("Name, email, and message are required.", 400);
    }

    const contactMessage = await ContactMessage.create({ name, email, subject, message });

    // Both emails fire in the background — a slow/failed email provider
    // shouldn't make the contact form itself feel broken to the user.
    sendContactNotificationEmail({ name, email, subject, message }).catch((err) =>
      console.error("Contact notification email failed:", err.message)
    );
    sendContactConfirmationEmail(email, name).catch((err) =>
      console.error("Contact confirmation email failed:", err.message)
    );

    res.status(201).json({
      success: true,
      message: "Message sent — we'll get back to you shortly.",
      contactMessage,
    });
  } catch (err) {
    next(err);
  }
};