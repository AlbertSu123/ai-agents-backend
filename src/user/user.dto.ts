import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetOrCreateUserDto {
  @IsString()
  @IsNotEmpty()
  address: string; // Compatible with Address from "viem"

  @IsString()
  @IsOptional()
  twitterHandle: string;
}
