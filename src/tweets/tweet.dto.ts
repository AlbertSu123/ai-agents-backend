import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTweetDto {
  @IsString()
  @IsNotEmpty()
  tweetId: string;

  @IsString()
  @IsNotEmpty()
  bountyId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
