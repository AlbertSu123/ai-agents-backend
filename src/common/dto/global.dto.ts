import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { type Request as ExpressRequest } from 'express';
import { PrivyJwtPayload } from 'src/common/helpers/privy/privy.dto';
import { Address } from 'viem';

export interface Request extends ExpressRequest {
  jwtData: PrivyJwtPayload;
}

export class ValidateFundWalletBodyDto {
  address: Address;
  eth_amount: number;
  token_amount: number;
  chain_id: number;
}

@Injectable()
export class ParseBigIntPipe implements PipeTransform<string, bigint> {
  transform(value: string): bigint {
    try {
      return BigInt(Number(value));
    } catch (e) {
      throw new BadRequestException(
        'Validation failed (string representation of number is expected for bigint type)',
      );
    }
  }
}
