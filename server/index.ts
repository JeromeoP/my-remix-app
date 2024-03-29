
import express, { Express } from 'express';
import submitRoute from './routes/api/submit';
import generatePDFRoute from './routes/api/generatePDF';
import signupRoute from './routes/api/signUp';
import signinRoute from './routes/api/signIn';

import cors from 'cors';

const app: Express = express();
app.use(cors());


app.use(express.json());
app.use('/api/submit', submitRoute);
app.use('/api/generate-pdf', generatePDFRoute);
app.use('/api/signUp', signupRoute); 
app.use('/api/signin', signinRoute);

// other configurations...

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
