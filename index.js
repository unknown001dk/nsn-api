import express from 'express';
import dotenv from 'dotenv';
import router from './routes/email.route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1', router);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
})