import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const envVars = () => ({
  databaseUrl: process.env.DATABASE_URL,
  privy: {
    appId: process.env.PRIVY_APP_ID,
    appSecret: process.env.PRIVY_APP_SECRET,
  },
  privateKey: process.env.PRIVATE_KEY,
  port: 80,
});

const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PRIVY_APP_ID: Joi.string().required(),
  PRIVY_APP_SECRET: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),
});

export const EnvConfig = ConfigModule.forRoot({
  load: [envVars],
  cache: true,
  isGlobal: true,
  validationSchema,
  validationOptions: {
    abortEarly: true,
  },
});
