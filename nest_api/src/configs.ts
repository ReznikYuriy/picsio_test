import * as dotenv from 'dotenv';

const configs = { path: `.env` };

dotenv.config(configs);
export default {
  mongo: {
    host: process.env.MONGO_DB_HOST,
    port: Number(process.env.MONGO_DB_PORT),
    database: process.env.MONGO_DB_NAME,
  },
  port: process.env.API_PORT,
  default_user: {
    name: process.env.DEFAULT_USER_NAME,
    email: process.env.DEFAULT_USER_EMAIL,
    password: process.env.DEFAULT_USER_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  },
};
