import { createTransport } from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  const transporter = createTransport({
    host: process.env.HOST,
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  await transporter.sendMail({
    to: email,
    subject,
    text,
    from: process.env.EMAIL_USER,
  });
};
