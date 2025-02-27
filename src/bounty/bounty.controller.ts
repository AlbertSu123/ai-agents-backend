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
import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import { Chain, createPublicClient } from 'viem';
import { supportedChains } from 'src/common/helpers/privy/constants';
import { ConfigService } from '@nestjs/config';
import { BOUNTY_ABI } from 'src/common/abis/Bounty';

@Controller('bounty')
export class BountyController {
  constructor(
    @Inject(BountyService) private bountyService: BountyService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

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
    try {
      await this.createOnchainBounty(
        newBounty.chainId,
        newBounty.description,
        newBounty.title,
        newBounty.value,
        newBounty.bountyScore,
        newBounty.creatingUsername,
      );
    } catch (error) {
      console.log(error);
    }
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

  async createOnchainBounty(
    chainId: number,
    description: string,
    title: string,
    value: number,
    bountyScore: number,
    creatingUsername: string,
  ) {
    const chain = supportedChains.find((chain: Chain) => chain.id === chainId);
    const publicClient = createPublicClient({
      chain: chain,
      transport: http(),
    });
    const walletClient = createWalletClient({
      chain: chain,
      transport: http(),
      account: privateKeyToAccount(this.configService.get('privateKey')),
    });
    const createBountyTx = await walletClient.writeContract({
      chain: walletClient.chain,
      account: walletClient.account,
      address: BOUNTY_ABI.addresses[chainId],
      abi: BOUNTY_ABI.abi,
      functionName: 'createBounty',
      args: [description, title, value, bountyScore, creatingUsername],
    });
    const createBountyTxReceipt = await publicClient.waitForTransactionReceipt({
      hash: createBountyTx,
    });
    return createBountyTxReceipt;
  }
}
