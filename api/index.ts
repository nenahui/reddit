import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config';
import { postsRouter } from './routers/posts';
import { usersRouter } from './routers/users';

const app = express();

app.use(cors(config.corsOptions));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
