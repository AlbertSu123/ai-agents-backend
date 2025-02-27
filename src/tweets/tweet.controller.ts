import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { JwtRequired } from 'src/common/decorators/jwt.decorator';
import { Request } from '../common/dto/global.dto';
import { CheckAllTweetsDto, SaveTweetDto, VerifyTweetDto } from './tweet.dto';
import { BountyService } from 'src/bounty/bounty.service';
import { TweetService } from './tweet.service';
import { UserService } from 'src/user/user.service';
import { Chain, createPublicClient, createWalletClient, http } from 'viem';
import { ConfigService } from '@nestjs/config';
import { privateKeyToAccount } from 'viem/accounts';
import { supportedChains } from 'src/common/helpers/privy/constants';
import { COIN_ABI } from 'src/common/abis/Coin';
@Controller('tweet')
export class TweetController {
  constructor(
    @Inject(TweetService) private tweetService: TweetService,
    @Inject(BountyService) private bountyService: BountyService,
    @Inject(UserService) private userService: UserService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  @Get('/')
  @HttpCode(200)
  async getAllTweets() {
    return await this.tweetService.getAllTweets();
  }

  @JwtRequired(true)
  @Post('/')
  @HttpCode(200)
  async saveTweet(@Req() request: Request, @Body() body: SaveTweetDto) {
    const { tweetData } = await this.tweetService.verifyTweet(body.tweetId, 0);
    const newTweet = await this.tweetService.create({
      id: body.tweetId,
      content: tweetData.tweetText,
      author: tweetData.author,
      viewCount: tweetData.viewCount,
      likes: tweetData.likes,
      retweets: tweetData.retweets,
      comments: tweetData.comments,
      bookmarks: tweetData.bookmarks,
      address: body.address,
    });
    await this.tweetService.save(newTweet);
    return newTweet;
  }

  @JwtRequired(true)
  @Post('/check-all')
  @HttpCode(200)
  async checkAllTweets(
    @Req() request: Request,
    @Body() body: CheckAllTweetsDto,
  ) {
    const user = await this.userService.get({ address: body.address });
    const myTweets = await this.tweetService.getMany({ address: body.address });
    const availableBounties = await this.bountyService.getMany({
      filled: null,
    });
    const bounties = [];
    for (const tweet of myTweets) {
      for (const bounty of availableBounties) {
        const { isVerified, tweetData } = await this.tweetService.verifyTweet(
          tweet.id,
          bounty.bountyScore,
        );
        tweet.bookmarks = tweetData.bookmarks;
        tweet.comments = tweetData.comments;
        tweet.content = tweetData.tweetText;
        tweet.retweets = tweetData.retweets;
        tweet.likes = tweetData.likes;
        await this.tweetService.save(tweet);
        if (isVerified) {
          bounty.tweetId = tweet.id;
          bounty.filled = new Date();
          bounty.fillingUserId = user.id;
          await this.bountyService.save(bounty);
          bounties.push(bounty);
          try {
            await this.sendReward(bounty.chainId, user.address, bounty.value);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    return bounties;
  }

  @JwtRequired(true)
  @Post('/verify')
  @HttpCode(200)
  async verifyTweet(@Req() request: Request, @Body() body: VerifyTweetDto) {
    const bounty = await this.bountyService.get({ id: body.bountyId });
    if (!bounty) {
      throw new NotFoundException('Bounty not found');
    }
    const user = await this.userService.get({
      address: body.address,
    });
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
      address: user.address,
    });
    await this.tweetService.save(newTweet);
    bounty.tweetId = newTweet.id;
    bounty.filled = new Date();
    bounty.fillingUserId = user.id;
    await this.bountyService.save(bounty);
    try {
      await this.sendReward(bounty.chainId, user.address, bounty.value);
    } catch (error) {
      console.log(error);
    }
    return newTweet;
  }

  getChain(chainId: number) {
    return supportedChains.find((chain: Chain) => chain.id === chainId);
  }

  async sendReward(chainId: number, address: string, amount: number) {
    const publicClient = createPublicClient({
      chain: this.getChain(chainId),
      transport: http(),
    });
    const walletClient = createWalletClient({
      chain: this.getChain(chainId),
      transport: http(),
      account: privateKeyToAccount(this.configService.get('privateKey')),
    });
    const mintTx = await walletClient.writeContract({
      chain: walletClient.chain,
      account: walletClient.account,
      address: COIN_ABI.addresses[chainId],
      abi: COIN_ABI.abi,
      functionName: 'mint',
      args: [address, amount],
    });
    const mintReceipt = await publicClient.waitForTransactionReceipt({
      hash: mintTx,
    });
    return mintReceipt;
  }
}
