import express from "express";
import { createMinistry } from "../controllers/ministry.controller.js";
import { verifyPublisherToken } from "../utils/verifuUser.js";
const router = express.Router();

router.post("/create/:id", verifyPublisherToken, createMinistry);

export default router;
