import dotenv from 'dotenv';
import Joi from 'joi';

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
  GMAIL_USER: string;
  GMAIL_APP_PASSWORD: string;
  LOG_LEVEL: string;
}

const envSchema = Joi.object<AppEnv>({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().integer().positive().default(5000),
  MONGODB_URI: Joi.string().trim().required(),
  DB_NAME: Joi.string().trim().required(),
  JWT_SECRET: Joi.string().trim().required(),
  JWT_EXPIRATION: Joi.string().trim().default('1d'),
  INTERSWITCH_BASE_URL: Joi.string().trim().required(),
  INTERSWITCH_CLIENT_ID: Joi.string().trim().required(),
  INTERSWITCH_SECRET_KEY: Joi.string().trim().required(),
  GMAIL_USER: Joi.string().trim().required(),
  GMAIL_APP_PASSWORD: Joi.string().trim().required(),
  LOG_LEVEL: Joi.string().trim().default('info')
});

const { value: validatedEnv, error } = envSchema.validate(
  process.env,
  {
    abortEarly: false,
    allowUnknown: true,
    convert: true
  }
);

if (error) {
  console.error(
    'Invalid environment variables',
    error.details.map((detail) => detail.message)
  );
  process.exit(1);
}

export const env = validatedEnv as AppEnv;
