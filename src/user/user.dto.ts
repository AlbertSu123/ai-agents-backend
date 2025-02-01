import { IsNotEmpty, IsString } from 'class-validator';

export class GetOrCreateUserDto {
  @IsString()
  @IsNotEmpty()
  address: string; // Compatible with Address from "viem"
}
