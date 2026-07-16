const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Fashion. <orders@yourdomain.com>";

// TODO (Phase 4): build real HTML templates for each of these
exports.sendWelcomeEmail = async (to, name) => {
  return resend.emails.send({ from: FROM, to, subject: "Welcome to Fashion.", html: `<p>Hi ${name}, welcome!</p>` });
};

exports.sendOrderConfirmationEmail = async (to, order) => {
  return resend.emails.send({ from: FROM, to, subject: `Order Confirmed #${order._id}`, html: `<p>Your order has been confirmed.</p>` });
};

exports.sendPasswordResetEmail = async (to, resetUrl) => {
  return resend.emails.send({ from: FROM, to, subject: "Reset your password", html: `<p><a href="${resetUrl}">Reset password</a></p>` });
};

exports.sendContactNotificationEmail = async (formData) => {
  return resend.emails.send({ from: FROM, to: "hello@yourdomain.com", subject: `Contact form: ${formData.subject || "New message"}`, html: `<p>${formData.message}</p>` });
};

exports.sendNewsletterEmail = async (to, content) => {
  return resend.emails.send({ from: FROM, to, subject: "Fashion. Newsletter", html: content });
};
