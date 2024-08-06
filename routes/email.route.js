import express from "express";
import { admissionMail, contactMail, contactUserMail } from "../controllers/email.controlller.js";

const router = express.Router();
router.post('/emails', admissionMail);
router.post('/contact', contactUserMail);
router.post('/message', contactMail);

export default router;