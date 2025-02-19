// src/server.ts
import App from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = App.getInstance(port);

app.listen();
