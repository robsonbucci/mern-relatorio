import express from "express";
import { publishersList } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/publishers/:userId", publishersList);

export default router;
