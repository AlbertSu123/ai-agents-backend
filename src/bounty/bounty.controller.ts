import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from '../common/dto/global.dto';
import { CreateBountyDto } from './bounty.dto';
import { BountyService } from './bounty.service';
import { Not } from 'typeorm';
import { IsNull } from 'typeorm';

@Controller('bounty')
export class BountyController {
  constructor(@Inject(BountyService) private bountyService: BountyService) {}

  @Post('/')
  @HttpCode(200)
  async createBounty(@Req() request: Request, @Body() body: CreateBountyDto) {
    console.log(body);
    const newBounty = await this.bountyService.create({
      description: body.description,
      title: body.title,
      value: body.value,
      bountyScore: body.bountyScore,
      creatingUsername: body.creatingUsername,
      chainId: body.chainId,
    });
    await this.bountyService.save(newBounty);
    return newBounty;
  }

  @Get('/')
  @HttpCode(200)
  async getBounties() {
    const bounties = await this.bountyService.getMany(
      {},
      { fillingUser: true },
    );
    return bounties;
  }

  @Get('/filled')
  @HttpCode(200)
  async getFilledBounties() {
    const bounties = await this.bountyService.getMany(
      { filled: Not(IsNull()) },
      { fillingUser: true },
    );
    return bounties;
  }
}
