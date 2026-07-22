const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// "onboarding@resend.dev" is Resend's sandbox sender — it works with zero
// setup, but Resend will only actually deliver those emails to the address
// you signed up to Resend with (not arbitrary customer emails). Once you
// verify your own domain in Resend's dashboard, set RESEND_FROM_EMAIL to
// something like "Not Tales <no-reply@yourrealdomain.com>" and every
// recipient works normally.
const FROM = process.env.RESEND_FROM_EMAIL || "Not Tales <onboarding@resend.dev>";
// Where contact-form notifications go — set this in .env once you have a real inbox.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hello@yourdomain.com";

// Shared header/footer so every email looks like it came from the same
// brand, without needing a full templating library for five short emails.
function emailWrapper(title, bodyHtml) {
  return `
    <div style="font-family: Arial, sans-serif; background:#F4EFE4; padding: 32px 16px;">
      <div style="max-width: 480px; margin: 0 auto; background:#ffffff; border-radius: 16px; overflow: hidden;">
        <div style="background:#4A3323; padding: 24px 32px;">
          <span style="color:#F4EFE4; font-size: 20px; font-weight: 700;">Not Tales</span>
        </div>
        <div style="padding: 32px;">
          <h1 style="font-size: 20px; margin: 0 0 16px;">${title}</h1>
          ${bodyHtml}
        </div>
        <div style="padding: 20px 32px; background:#EDE6D6; font-size: 12px; color:#1A1410aa;">
          © ${new Date().getFullYear()} Not Tales. All rights reserved.
        </div>
      </div>
    </div>
  `;
}

exports.sendWelcomeEmail = async (to, name) => {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome to Not Tales",
    html: emailWrapper(
      `Welcome, ${name}.`,
      `<p style="color:#1A1410cc; line-height:1.6;">Your account is ready. Browse the latest drops and enjoy faster checkout on every order.</p>`
    ),
  });
};

exports.sendOrderConfirmationEmail = async (to, order) => {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0; font-size:14px;">${item.name} × ${item.quantity}</td>
        <td style="padding:8px 0; font-size:14px; text-align:right;">₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>`
    )
    .join("");

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Order confirmed — #${order._id}`,
    html: emailWrapper(
      "Your order is confirmed.",
      `
      <p style="color:#1A1410cc; line-height:1.6;">Thanks for shopping with us. Here's a summary:</p>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        ${itemsHtml}
        <tr><td style="padding-top:12px; border-top:1px solid #eee; font-weight:700;">Total</td>
            <td style="padding-top:12px; border-top:1px solid #eee; font-weight:700; text-align:right;">₦${order.total.toLocaleString()}</td></tr>
      </table>
      `
    ),
  });
};

exports.sendPasswordResetOtpEmail = async (to, otp) => {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Your reset code: ${otp}`,
    html: emailWrapper(
      "Reset your password",
      `
      <p style="color:#1A1410cc; line-height:1.6;">Use this code to reset your password. It expires in 15 minutes.</p>
      <p style="font-size:32px; font-weight:700; letter-spacing:6px; text-align:center; background:#F4EFE4; padding:16px; border-radius:12px; margin:20px 0;">${otp}</p>
      <p style="color:#1A141088; font-size:12px;">Didn't request this? You can safely ignore this email.</p>
      `
    ),
  });
};

exports.sendContactNotificationEmail = async (formData) => {
  return resend.emails.send({
    from: FROM,
    to: CONTACT_EMAIL,
    reply_to: formData.email, // hitting reply goes straight to the customer
    subject: `New contact form message: ${formData.subject || "No subject"}`,
    html: emailWrapper(
      "New message from the contact form",
      `
      <p style="font-size:14px;"><strong>From:</strong> ${formData.name} (${formData.email})</p>
      <p style="color:#1A1410cc; line-height:1.6; margin-top:16px;">${formData.message}</p>
      `
    ),
  });
};

exports.sendContactConfirmationEmail = async (to, name) => {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "We've got your message",
    html: emailWrapper(
      `Thanks, ${name}.`,
      `<p style="color:#1A1410cc; line-height:1.6;">We've received your message and will get back to you shortly.</p>`
    ),
  });
};

exports.sendNewsletterEmail = async (to, content) => {
  return resend.emails.send({ from: FROM, to, subject: "Not Tales Newsletter", html: emailWrapper("Not Tales", content) });
};