import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes.js';
import connectDB from './database.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
