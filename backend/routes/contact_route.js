import { sendMaill } from "../utils/contactEmail.js";
import express from "express";

const router = express.Router();

router.post("/send", (req, res) => {
  console.log(req.body);
  sendMaill(req.body.email, req.body.subject, req.body.message);
  res.send({ message: "Email sent", success: true });
});

export default router;
