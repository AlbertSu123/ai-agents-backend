import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';
import * as Joi from 'joi';

const envVars = () => ({
  databaseUrl: process.env.DATABASE_URL,
  privy: {
    appId: process.env.PRIVY_APP_ID,
    appSecret: process.env.PRIVY_APP_SECRET,
    verificationKey: fs.readFileSync(
      'src/common/helpers/privy/verification.key.pem',
    ),
  },
  moonpay: {
    secretKey: process.env.MOONPAY_SECRET_KEY,
  },
  birdeye: {
    apiKey: process.env.BIRDEYE_API_KEY,
  },
  helius: {
    apiKey: process.env.HELIUS_API_KEY,
  },
  gasWallet: {
    privateKey: process.env.GAS_WALLET_PRIVATE_KEY_BS58,
  },
  port: 80,
});

const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PRIVY_APP_ID: Joi.string().required(),
  PRIVY_APP_SECRET: Joi.string().required(),
  MOONPAY_SECRET_KEY: Joi.string().required(),
  BIRDEYE_API_KEY: Joi.string().required(),
  HELIUS_API_KEY: Joi.string().required(),
  GAS_WALLET_PRIVATE_KEY_BS58: Joi.string().required(),
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
