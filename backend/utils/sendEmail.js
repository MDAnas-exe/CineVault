import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

const sendMail = async (to, subject, html) => {
  try {
    const emailLines = [
      `From: ${process.env.EMAIL_FROM}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-type: text/html; charset=utf-8",
      "",
      html,
    ];

    const emailRaw = emailLines.join("\r\n");

    const encodedMessage = Buffer.from(emailRaw)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
  } catch (err) {
    console.error("GMAIL API FAILURE:", err.message || err);
    throw new Error("Failed to send email");
  }
};

export default sendMail;
