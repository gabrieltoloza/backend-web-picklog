
import { mailService } from "../service/email.service.js";
import { emailSchema } from "../zod/email.schema.js";

export class EmailController {
    static async sendMail(req, res) {
        const parseResult = emailSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                type: 'validation',
                error: parseResult.error.errors 
            });
        }
        const data = parseResult.data;
        try {
            const result = await mailService.sendMail(data);
            res.status(200).json({ 
                success: true,
                data: result 
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                type: 'mail',
                error: error.message 
            });
        }
    }
}