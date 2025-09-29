import 'dotenv/config';
import express from 'express';
import emailRouter from './router/email.routes.js';
import trackingRouter from './router/tracking.routes.js';
import cors from 'cors'



const app = express();
const PORT = process.env.PORT || 9090;
app.use(express.json());


app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://picklogweb.vercel.app',
        'https://picklog.com.ar'
    ],
}));


app.use('/contact', emailRouter); // Usa el router de mailing
app.use('/tracking', trackingRouter); // Usa el router de tracking



app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));