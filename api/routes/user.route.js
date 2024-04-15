import {
    createPublisher,
    getAllPublishersBySuperintendent,
    getSuperintendent,
    updateSuperintendent,
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
router.post("/superintendent/update/:id", verifyToken, updateSuperintendent);

router.get("/publishers/:id", verifyToken, getAllPublishersBySuperintendent);
router.post("/publisher/create/:id", verifyToken, createPublisher);

export default router;
