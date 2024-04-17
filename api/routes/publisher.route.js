import express from "express";
import { signinPublisher } from "../controllers/publisher.controller.js";
const router = express.Router();

router.post("/signin", signinPublisher);

export default router;
