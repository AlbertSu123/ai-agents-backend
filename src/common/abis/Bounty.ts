import { MultichainAbi } from './types';

export const BOUNTY_ABI: MultichainAbi = {
  addresses: {
    8453: '0x7e57A62c606DC0F13e2ec93F38d37c254F860c73',
    85432: '0x7e57A62c606DC0F13e2ec93F38d37c254F860c73',
    48899: '0x7e57A62c606DC0F13e2ec93F38d37c254F860c73',
    545: '0x7e57A62c606DC0F13e2ec93F38d37c254F860c73',
    296: '0x7e57A62c606DC0F13e2ec93F38d37c254F860c73',
    50312: '0x7e57A62c606DC0F13e2ec93F38d37c254F860c73',
    11155111: '0x84ed10068c8F06E5fCC4b0C5A56100618260C301',
    763373: '0x7e57A62c606DC0F13e2ec93F38d37c254F860c73',
  },
  abi: [
    { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
    {
      type: 'function',
      name: 'bounties',
      inputs: [{ name: 'bountyId', type: 'uint256', internalType: 'uint256' }],
      outputs: [
        { name: 'description', type: 'string', internalType: 'string' },
        { name: 'title', type: 'string', internalType: 'string' },
        { name: 'value', type: 'uint256', internalType: 'uint256' },
        { name: 'bountyScore', type: 'uint256', internalType: 'uint256' },
        { name: 'creatingUsername', type: 'string', internalType: 'string' },
        { name: 'createdAt', type: 'uint256', internalType: 'uint256' },
        { name: 'filledAt', type: 'uint256', internalType: 'uint256' },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'bountyIds',
      inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
      outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'createBounty',
      inputs: [
        { name: 'description', type: 'string', internalType: 'string' },
        { name: 'title', type: 'string', internalType: 'string' },
        { name: 'value', type: 'uint256', internalType: 'uint256' },
        { name: 'bountyScore', type: 'uint256', internalType: 'uint256' },
        { name: 'creatingUsername', type: 'string', internalType: 'string' },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'getBounties',
      inputs: [],
      outputs: [
        {
          name: '',
          type: 'tuple[]',
          internalType: 'struct Bounty.Bounty[]',
          components: [
            { name: 'description', type: 'string', internalType: 'string' },
            { name: 'title', type: 'string', internalType: 'string' },
            { name: 'value', type: 'uint256', internalType: 'uint256' },
            { name: 'bountyScore', type: 'uint256', internalType: 'uint256' },
            {
              name: 'creatingUsername',
              type: 'string',
              internalType: 'string',
            },
            { name: 'createdAt', type: 'uint256', internalType: 'uint256' },
            { name: 'filledAt', type: 'uint256', internalType: 'uint256' },
          ],
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'owner',
      inputs: [],
      outputs: [{ name: '', type: 'address', internalType: 'address' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'renounceOwnership',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'transferOwnership',
      inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'event',
      name: 'OwnershipTransferred',
      inputs: [
        {
          name: 'previousOwner',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'newOwner',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
      ],
      anonymous: false,
    },
    {
      type: 'error',
      name: 'OwnableInvalidOwner',
      inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
    },
    {
      type: 'error',
      name: 'OwnableUnauthorizedAccount',
      inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    },
  ],
};
