import { Router } from 'express';
import {
  shortenURL,
  redirectURL,
  getURLAnalytics,
} from './controllers.js';
import {
  apiRateLimiter,
  shortenRateLimiter,
} from './rateLimiter.js';

const router = Router();

router.use(apiRateLimiter);
router.post('/shorten', shortenRateLimiter, shortenURL);
router.get('/:slug', redirectURL);
router.get('/:slug/analytics', shortenRateLimiter, getURLAnalytics);

export default router;
