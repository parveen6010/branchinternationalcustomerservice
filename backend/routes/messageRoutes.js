import express from "express";
import {
  getMessageById,
  getMessages,
  CreateMessage,
  DeleteMessage,
  UpdateMessage,
  GetAllMessage,
  respon
} from "../controllers/messageController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getMessages);
router.route("/create").post(protect, CreateMessage);
router.route("/getallmessages").get(GetAllMessage); // Place this route above the '/:id' route
router.route("/respon").post(respon); // Place this route above the '/:id' route

router
  .route("/:id")
  .get(getMessageById)
  .delete(protect, DeleteMessage)
  .put(UpdateMessage);

export default router;


