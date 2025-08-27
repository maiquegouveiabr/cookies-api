import { Router } from 'express';
import { getCookies } from '../controllers/cookiesController.js';

const router = Router();

router.post('/', getCookies);

export default router;
