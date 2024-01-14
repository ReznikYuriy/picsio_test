import * as dotenv from 'dotenv';

const configs = { path: `.env` };

dotenv.config(configs);
export default {
  mongo: {
    host: process.env.MONGO_DB_HOST || '127.0.0.1',
    port: Number(process.env.MONGO_DB_PORT) || 27017,
    database: process.env.MONGO_DB_NAME || 'picsio_db',
  },
  port: process.env.API_PORT || 3000,
  default_user: {
    name: process.env.DEFAULT_USER_NAME || 'admin',
    email: process.env.DEFAULT_USER_EMAIL || 'admin@admin.com',
    password: process.env.DEFAULT_USER_PASSWORD || 'admin',
  },
};
