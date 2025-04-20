import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  bcrypt_salts_round: process.env.BCRYPT_SALTS_ROUND,
  NODE_ENV: process.env.NODE_ENV,
  jwt_access_expireIn: process.env.JWT_ACCESS_EXPIREIN,
};
