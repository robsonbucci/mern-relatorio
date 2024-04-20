import express from "express";
import { createMinistry } from "../controllers/ministry.controller.js";
const router = express.Router();

router.post("/create", createMinistry);

export default router;
