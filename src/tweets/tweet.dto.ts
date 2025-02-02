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

export class SaveTweetDto {
  @IsString()
  @IsNotEmpty()
  tweetId: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export class CheckAllTweetsDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}
