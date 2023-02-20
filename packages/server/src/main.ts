/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import {} from '@tenup-finder/find-tournaments';
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (_, res) => {
  res.send({ message: 'Welcome to server!' });
});

const port = 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
