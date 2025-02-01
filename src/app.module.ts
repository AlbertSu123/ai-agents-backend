import { Module } from '@nestjs/common';
import { DatabaseConfig } from './common/config/database';
import { EnvConfig } from './common/config/env';
import { UserModule } from './user/user.module';
import { AppController } from 'src/app.controller';
import { BountyModule } from './bounty/bounty.module';
import { TweetModule } from './tweets/tweet.module';

@Module({
  imports: [EnvConfig, DatabaseConfig, UserModule, BountyModule, TweetModule],
  controllers: [AppController],
})
export class AppModule {}
