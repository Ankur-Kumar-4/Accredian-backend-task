// src/services/emailService.ts
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });

  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token");
      }
      resolve(token || '');
    });
  });

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  } as nodemailer.TransportOptions);

  return transporter;
};

const sendReferralEmail = async (to: string, referralCode: string) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: "You've been referred!",
    text: `You've been referred to our service. Your referral code is: ${referralCode}`,
    html: `<p>You've been referred to our service. Your referral code is: <strong>${referralCode}</strong></p>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default {
  sendReferralEmail
};