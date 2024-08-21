import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import router from './routes/routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);


Connection();
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
