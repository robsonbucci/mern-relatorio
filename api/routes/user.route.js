import express from "express";
import { createPublisher, publishersList } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/publishers/:userId", publishersList);
router.post("/publisher", createPublisher);

export default router;
