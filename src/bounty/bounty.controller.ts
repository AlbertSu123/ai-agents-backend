import { Body, Controller, HttpCode, Inject, Post, Req } from '@nestjs/common';
import { JwtRequired } from 'src/common/decorators/jwt.decorator';
import { Request } from '../common/dto/global.dto';
import { CreateBountyDto } from './bounty.dto';
import { BountyService } from './bounty.service';

@Controller('bounty')
export class BountyController {
  constructor(@Inject(BountyService) private bountyService: BountyService) {}

  @JwtRequired(true)
  @Post('/')
  @HttpCode(200)
  async createBounty(@Req() request: Request, @Body() body: CreateBountyDto) {
    const newBounty = await this.bountyService.create({
      description: body.description,
      title: body.title,
      value: body.value,
      bountyScore: body.bountyScore,
    });
    await this.bountyService.save(newBounty);
    return newBounty;
  }
}
