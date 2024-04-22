import express from "express";
import {
  createMinistry,
  listMinistryBySuper,
} from "../controllers/ministry.controller.js";
import { verifyPublisherToken, verifyToken } from "../utils/verifuUser.js";
const router = express.Router();

router.post("/create/:id", verifyPublisherToken, createMinistry);
router.post("/super/list/:id", verifyToken, listMinistryBySuper);

export default router;
