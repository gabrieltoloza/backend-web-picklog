import { z } from "zod";

export const trackingHistorialSchema = z.object({
    codigo_envio: z.string()
});