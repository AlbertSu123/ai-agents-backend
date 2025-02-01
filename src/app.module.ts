import { Module } from '@nestjs/common';
import { DatabaseConfig } from './common/config/database';
import { EnvConfig } from './common/config/env';
import { UserModule } from './user/user.module';
import { AppController } from 'src/app.controller';
@Module({
  imports: [EnvConfig, DatabaseConfig, UserModule],
  controllers: [AppController],
})
export class AppModule {}
