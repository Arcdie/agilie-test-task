import { Router } from 'express';

import * as notificationController from '../../controllers/cron/notification.controller';

const router = Router();

router.get('/check', notificationController.checkForSending);

export default router;
