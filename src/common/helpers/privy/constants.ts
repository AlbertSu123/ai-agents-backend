import { PublicKey } from '@solana/web3.js';

export const BIGINT_PRECISION = 36;
export const BIGINT_MAX =
  BigInt(10) ** BigInt(BIGINT_PRECISION + 1) - BigInt(1);
export const SOLANA_USDC_ADDRESS =
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
export const SOLANA_USDC_DECIMALS = 6;
export const MOONSHOT_FEE_BPS = 200;
export const usdcMint = new PublicKey(
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
);
