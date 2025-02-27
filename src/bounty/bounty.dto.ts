import { IsNumber, IsString } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsString()
  creatingUsername: string;

  @IsNumber()
  bountyScore: number;

  @IsNumber()
  chainId: number;
}
