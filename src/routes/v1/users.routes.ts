import { Router } from "express";
import {
  getUsers,
  rollNumberExist,
  verifyPartialEmail,
  login,
  setPassword,
  verifyOtp,
} from "../../controllers/user.controller";


const router = Router();
router.get("/", getUsers);
router.get("/rollNumber-exist/:rollNumber", rollNumberExist);
router.get("/verify-partial-email/:rollNumber/:email", verifyPartialEmail);

router.post("/login", login);

router.post("/set-password", setPassword);
router.post("/verify-otp", verifyOtp);

export default router;
