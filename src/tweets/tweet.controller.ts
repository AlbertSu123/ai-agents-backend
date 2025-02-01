import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Inject,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { JwtRequired } from 'src/common/decorators/jwt.decorator';
import { Request } from '../common/dto/global.dto';
import { VerifyTweetDto } from './tweet.dto';
import { BountyService } from 'src/bounty/bounty.service';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(
    @Inject(TweetService) private tweetService: TweetService,
    @Inject(BountyService) private bountyService: BountyService,
  ) {}

  @JwtRequired(true)
  @Post('/verify')
  @HttpCode(200)
  async verifyTweet(@Req() request: Request, @Body() body: VerifyTweetDto) {
    const bounty = await this.bountyService.get({ id: body.bountyId });
    if (!bounty) {
      throw new NotFoundException('Bounty not found');
    }
    const { isVerified, tweetData } = await this.tweetService.verifyTweet(
      body.tweetId,
      bounty.bountyScore,
    );
    if (!isVerified) {
      throw new BadRequestException(
        'Tweet did not score enough for the bounty',
      );
    }
    const newTweet = await this.tweetService.create({
      id: body.tweetId,
      content: tweetData.tweetText,
      author: tweetData.author,
      viewCount: tweetData.viewCount,
      likes: tweetData.likes,
      retweets: tweetData.retweets,
      comments: tweetData.comments,
      bookmarks: tweetData.bookmarks,
    });
    await this.tweetService.save(newTweet);
    return newTweet;
  }
}
