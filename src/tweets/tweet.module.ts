import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetEntity } from './tweet.entity';
import { JwtModule } from '@nestjs/jwt';
import { BountyModule } from 'src/bounty/bounty.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([TweetEntity]),
    BountyModule,
    UserModule,
  ],
  controllers: [TweetController],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
