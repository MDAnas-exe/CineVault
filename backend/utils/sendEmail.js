import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    secure: process.env.NODE_ENV === "production",
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
});
transporter.verify((error, success) => {
  if (error) {
    console.error("CRITICAL SMTP FAILURE:", error);
  } else {
    console.log("SMTP IS READY TO SEND");
  }
});
const sendMail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

export default sendMail;
