import { Router } from 'express';
import { getCookies } from '../controllers/cookiesController';

const router = Router();

router.post('/', getCookies);

export default router;
