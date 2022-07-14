import * as express from 'express';

import authRoute from './app/routes/auth';

import configs from './app/configs';
import { connectToDatabase } from './app/services/db';

import * as cors from 'cors';

import { json } from 'body-parser';

const app = express();

app.use(cors());
app.use(json());

connectToDatabase()
  .then(() => {
    app.get('/ping', (req, res) => {
      res.send('pong');
    });

    app.use('/api/auth', authRoute);

    app.listen(configs.api.port, () => {
      console.log(`Listening at http://localhost:${configs.api.port}/api`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });