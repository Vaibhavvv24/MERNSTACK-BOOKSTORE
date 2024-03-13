import { createTransport } from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  const transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3926f40d39dd54",
      pass: "b3e765133790ba",
    },
  });
  await transporter.sendMail({
    to: email,
    subject,
    text,
    from: process.env.EMAIL_USER,
  });
};
