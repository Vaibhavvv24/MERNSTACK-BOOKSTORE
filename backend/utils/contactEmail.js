import { createTransport } from "nodemailer";

export const sendMaill = (email, subject, text) => {
  console.log(email, subject, text);
  const transporter = createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: "eduggpfvgrvfuzil",
    },
  });
  const configs = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  console.log(configs);
  transporter.sendMail(configs);
};
