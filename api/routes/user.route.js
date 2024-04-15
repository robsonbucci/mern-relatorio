import {
    createPublisher,
    getAllPublishersBySuperintendent,
    getSuperintendent,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifuUser.js";

import express from "express";
const router = express.Router();

router.get("/superintendent/:id", verifyToken, getSuperintendent);
router.get(
    "/superintendents/:id",
    verifyToken,
    getAllPublishersBySuperintendent,
);

router.post("/publisher/:id", verifyToken, createPublisher);
router.get("/publishers/:id", verifyToken, getAllPublishersBySuperintendent);

export default router;
