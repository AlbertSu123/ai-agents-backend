import type { Abi, Hex } from 'viem';

export type MultichainAbi = {
  addresses: { [chainId: number]: Hex };
  abi: Abi;
};
