import { z } from "zod";

export const emailSchema = z.object({
    apellido: z.string(),
    barrio: z.string(),
    correo: z.string(),
    dni: z.string(),
    marca: z.string(),
    nombre: z.string(),
    pais: z.string(),
    patente: z.string(),
    phone: z.string(),
    registrado: z.string().length(2) // Solo acepta longitud 2, ej: "SI" o "NO"
});