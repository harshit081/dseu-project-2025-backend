import { Router } from "express";
import {
  rollNumberExist,
  verifyPartialEmail,
  login,
  setPassword,
  verifyOtp,
  generateCaptcha,
  verifyCaptcha,
} from "../../controllers/user.controller";
const router = Router();
// CAPTCHA routes
router.get("/generate-captcha", generateCaptcha);
router.post("/verify-captcha", verifyCaptcha);



router.get("/rollNumber-exist/:rollNumber", rollNumberExist);
router.get("/verify-partial-email/:rollNumber/:email", verifyPartialEmail);

router.post("/login", login);

router.post("/set-password", setPassword);
router.post("/verify-otp", verifyOtp);

export default router;
