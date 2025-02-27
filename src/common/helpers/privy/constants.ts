import { defineChain } from 'viem';
import {
  base,
  baseSepolia,
  flowTestnet,
  hederaTestnet,
  inkSepolia,
  sepolia,
  zircuitTestnet,
  zksyncSepoliaTestnet,
} from 'viem/chains';

export const DEFAULT_CHAIN = sepolia;
export const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Somnia',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnia.network/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://shannon-explorer.somnia.network/',
    },
  },
});

export const u2uTestnet = defineChain({
  id: 2484,
  name: 'U2U Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-nebulas-testnet.u2u.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://testnet.u2uscan.xyz',
    },
  },
});

export const supportedChains = [
  base,
  baseSepolia,
  zircuitTestnet,
  flowTestnet,
  hederaTestnet,
  zksyncSepoliaTestnet,
  somniaTestnet,
  sepolia,
  inkSepolia,
  u2uTestnet,
];
