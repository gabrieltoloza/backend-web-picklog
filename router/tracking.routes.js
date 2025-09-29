import { Router } from "express";
import { TrackingController } from "../controller/tracking.controller.js";
import { getTokenAkeron } from "../middleware/getTokenAkeron.js";


const router = Router();

router.post('/historial', getTokenAkeron ,TrackingController.getTrackingHistorial);

export default router;