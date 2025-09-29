import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);




export class mailService {
    static async sendMail(formData) {

        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const fecha = `${dd}${mm}${yyyy}`;

        const html = `
            <h2>Formulario de transportistas</h2>
            <p>Los siguientes datos fueron enviados para una solicitud de inscripción:</p>
            <ul>
                <li><b>Apellido:</b> ${formData.apellido}</li>
                <li><b>Barrio:</b> ${formData.barrio}</li>
                <li><b>Correo:</b> ${formData.correo}</li>
                <li><b>DNI:</b> ${formData.dni}</li>
                <li><b>Marca:</b> ${formData.marca}</li>
                <li><b>Nombre:</b> ${formData.nombre}</li>
                <li><b>País:</b> ${formData.pais}</li>
                <li><b>Patente:</b> ${formData.patente}</li>
                <li><b>Teléfono:</b> ${formData.phone}</li>
                <li><b>Registrado:</b> ${formData.registrado}</li>
            </ul>
        `;
        const subject = `Formulario de transportistas - ${fecha}`
        const { data, error } = await resend.emails.send({
            from: 'Pick & Log <inscripcionesweb@picklog.online>',
            to: 'gtoloza.acquabsas@gmail.com', // tu casilla fija
            subject: subject,
            html,
        });
        if (error) throw new Error(error.message || 'Error enviando email');
        return data;
    }
}