import express from "express";
import {
    createP,
    createPublisher,
    getAllPublishersBySuperintendent,
    getSuperintendent,
    getPublisher,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifuUser.js";

const router = express.Router();

router.get("/superintendent/:id", getSuperintendent);
router.get("/superintendents", verifyToken, getAllPublishersBySuperintendent);

router.get("/publisher/:id", getPublisher);
router.get("/publishers/:id", verifyToken, getAllPublishersBySuperintendent);

router.post("/publisher", verifyToken, createP);
// router.post("/publisher", createPublisher);

export default router;
