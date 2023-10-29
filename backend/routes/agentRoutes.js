import express from "express";
import 
 { agentauthUser,
  agentregisterUser,
  agentupdateUserProfile
}
 from "../controllers/agentController.js";

import { agentprotect } from "../middleware/agentauthMiddleware.js";
const router = express.Router();

router.route("/register").post(agentregisterUser);
router.post("/login", agentauthUser);
router.route("/profile").post(agentprotect, agentupdateUserProfile);

export default router;

