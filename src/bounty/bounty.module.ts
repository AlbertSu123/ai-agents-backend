import { Module } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { BountyController } from './bounty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BountyEntity } from './bounty.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([BountyEntity])],
  controllers: [BountyController],
  providers: [BountyService],
  exports: [BountyService],
})
export class BountyModule {}
