import { Router } from 'express';

import * as appointmentController from '../controllers/appointment.controller';

const router = Router();

router.post('/', appointmentController.createAppointment);

export default router;
