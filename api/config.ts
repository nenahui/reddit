import type { CorsOptions } from 'cors';
import path from 'node:path';

const rootPath = __dirname;

const corsWhitelist = ['http://localhost:3000', 'http://172.20.10.4:3000'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export const config = {
  port: 8000,
  corsOptions,
  publicPath: path.join(rootPath, 'public'),
  database: 'mongodb://localhost/reddit',
};
