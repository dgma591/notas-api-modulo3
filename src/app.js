import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import { loggerMiddleware } from './presentation/middlewares/logger.middleware';
import noteRoutes from './presentation/routes/note.routes';
import {connectMongo} from './infraestructure/datebase/mongo/conection';
import {connectMysql} from './infraestructure/datebase/mysql/conection';
import { setupSwagger } from './infraestructure/config/swagger.config';

await connectMongo();
//await connectMysql();

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);
app.use(loggerMiddleware);
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
app.use('/api/v1/notes', noteRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API de notas active'});
});

//midleware de manejo de errores global

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});