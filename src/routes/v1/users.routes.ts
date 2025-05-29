import { Router } from "express";
import {
  getUsers,
  rollNumberExist,
  verifyPartialEmail,
  login,
} from "../../controllers/user.controller";


const router = Router();
router.get("/", getUsers);
router.get("/rollNumber-exist/:rollNumber", rollNumberExist);
router.get("/verify-partial-email/:rollNumber/:email", verifyPartialEmail);
router.post("/login", login);

export default router;
