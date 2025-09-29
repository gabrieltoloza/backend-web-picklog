
import { Router } from "express";
import { EmailController } from "../controller/email.controller.js";

const router = Router();

router.post('/send', EmailController.sendMail);

export default router;