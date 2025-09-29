import { TrackingService } from "../service/tracking.service.js";
import { trackingHistorialSchema } from "../zod/tracking.schema.js";

export class TrackingController {

    static async getTrackingHistorial (req, res) {
        const parseResult = trackingHistorialSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                type: 'validation',
                error: parseResult.error.errors
            });
        }
        const { codigo_envio } = parseResult.data;
        try {
            const token = req.akeronToken;
            const result = await TrackingService.getHistorial(token, codigo_envio);
            res.status(200).json({ success: true, data: result });
            
        } catch (error) {
            res.status(400).json({
                success: false,
                type: 'historial',
                error: error.message
            });
        }
    }
}