import express from 'express';
import { test } from '../controllers/publisher.controller.js';

const router = express.Router();

router.get('/test', test);
router.post('/create', create);

export default router;
