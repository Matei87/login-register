import express from 'express';
import { profileUser } from '../controllers/profile.js';

const router = express.Router();

router.get('/', profileUser);

export default router;
