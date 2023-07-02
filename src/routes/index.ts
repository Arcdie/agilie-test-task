import { Router } from 'express';

import cronRoute from './cron';

import userRoute from './user.route';
import doctorRoute from './doctor.route';
import appointmentRoute from './appointment.route';

const router = Router();

router.use('/api/users', userRoute);
router.use('/api/doctors', doctorRoute);
router.use('/api/appointments', appointmentRoute);

router.use('/cron', cronRoute);

export default router;
