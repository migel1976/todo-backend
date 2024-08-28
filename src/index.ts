import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/todos';

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', router);
app.listen(port, () => console.log(`Running on port ${port}`));
