import express, { Express } from 'express';
import submitRoute from './routes/api/submit';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(cors());

app.use(express.json());
app.use('/api/submit', submitRoute);

// other configurations...

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
