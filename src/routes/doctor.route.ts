import { Router } from 'express';

import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.get('/', doctorController.getDoctors);
router.post('/', doctorController.createDoctor);

export default router;
