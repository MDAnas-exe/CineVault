import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      html,
    });
  } catch (err) {
    console.error("SENDGRID FAILURE:", err.response?.body || err.message);
    throw new Error("Failed to send email");
  }
};

export default sendMail;
