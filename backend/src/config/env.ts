import dotenv from 'dotenv';

dotenv.config();

type NodeEnvironment = 'development' | 'test' | 'production';

export interface AppEnv {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  MONGODB_URI: string;
  DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  INTERSWITCH_BASE_URL: string;
  INTERSWITCH_CLIENT_ID: string;
  INTERSWITCH_SECRET_KEY: string;
  // INTERSWITCH_MERCHANT_CODE: string;
  GMAIL_USER: string;
  GMAIL_APP_PASSWORD: string;
  // EMAIL_FROM: string;
  LOG_LEVEL: string;
}

function readEnv(name: string): string {
  return (process.env[name] || '').trim();
}

function validateNodeEnv(value: string): value is NodeEnvironment {
  return value === 'development' || value === 'test' || value === 'production';
}

export function validateEnv(): AppEnv {
  const missing: string[] = [];

  const NODE_ENV = readEnv('NODE_ENV');
  const PORT_RAW = readEnv('PORT');
  const MONGODB_URI = readEnv('MONGODB_URI');
  const DB_NAME = readEnv('DB_NAME');
  const JWT_SECRET = readEnv('JWT_SECRET');
  const JWT_EXPIRATION = readEnv('JWT_EXPIRATION');
  const INTERSWITCH_BASE_URL = readEnv('INTERSWITCH_BASE_URL');
  const INTERSWITCH_CLIENT_ID = readEnv('INTERSWITCH_CLIENT_ID');
  const INTERSWITCH_SECRET_KEY = readEnv('INTERSWITCH_SECRET_KEY');
  // const INTERSWITCH_MERCHANT_CODE = readEnv('INTERSWITCH_MERCHANT_CODE');
  const GMAIL_USER = readEnv('GMAIL_USER');
  const GMAIL_APP_PASSWORD = readEnv('GMAIL_APP_PASSWORD') || readEnv('APP_PASSWORD');
  // const EMAIL_FROM = readEnv('EMAIL_FROM');
  const LOG_LEVEL = readEnv('LOG_LEVEL');

  if (!NODE_ENV) missing.push('NODE_ENV');
  if (!PORT_RAW) missing.push('PORT');
  if (!MONGODB_URI) missing.push('MONGODB_URI');
  if (!DB_NAME) missing.push('DB_NAME');
  if (!JWT_SECRET) missing.push('JWT_SECRET');
  if (!JWT_EXPIRATION) missing.push('JWT_EXPIRATION');
  if (!INTERSWITCH_BASE_URL) missing.push('INTERSWITCH_BASE_URL');
  if (!INTERSWITCH_CLIENT_ID) missing.push('INTERSWITCH_CLIENT_ID');
  if (!INTERSWITCH_SECRET_KEY) missing.push('INTERSWITCH_SECRET_KEY');
  // if (!INTERSWITCH_MERCHANT_CODE) missing.push('INTERSWITCH_MERCHANT_CODE');
  if (!GMAIL_USER) missing.push('GMAIL_USER');
  if (!GMAIL_APP_PASSWORD) missing.push('GMAIL_APP_PASSWORD (or APP_PASSWORD)');
  // if (!EMAIL_FROM) missing.push('EMAIL_FROM');
  if (!LOG_LEVEL) missing.push('LOG_LEVEL');

  const PORT = Number(PORT_RAW);
  if (PORT_RAW && (!Number.isInteger(PORT) || PORT <= 0)) {
    missing.push('PORT (must be a positive integer)');
  }

  if (NODE_ENV && !validateNodeEnv(NODE_ENV)) {
    missing.push('NODE_ENV (must be one of development|test|production)');
  }

  if (missing.length > 0) {
    throw new Error(
      `Environment validation failed. Missing/invalid variables:\n- ${missing.join('\n- ')}`
    );
  }

  return {
    NODE_ENV: NODE_ENV as NodeEnvironment,
    PORT,
    MONGODB_URI,
    DB_NAME,
    JWT_SECRET,
    JWT_EXPIRATION,
    INTERSWITCH_BASE_URL,
    INTERSWITCH_CLIENT_ID,
    INTERSWITCH_SECRET_KEY,
    // INTERSWITCH_MERCHANT_CODE,
    GMAIL_USER,
    GMAIL_APP_PASSWORD,
    // EMAIL_FROM,
    LOG_LEVEL
  };
}

export const env = validateEnv();
