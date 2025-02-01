export type PrivyJwtPayload = {
  sid: string;
  iss: string;
  iat: number;
  aud: string;
  sub: string;
  exp: number;
};

export type PrivyUser = {
  id: string;
  created_at: number;
  linked_accounts: (PrivyLinkedWallet &
    PrivyLinkedGoogle &
    PrivyLinkedEmail &
    PrivyLinkedPhone &
    PrivyLinkedDiscord)[];
  mfa_methods: [];
  has_accepted_terms: boolean;
} & { error?: string };

export type PrivyUserDetails = {
  username?: string;
  address: string;
  email?: string;
  phone?: string;
};

type PrivyLinkedWallet = {
  type: string; // type: 'wallet'
  address: string;
  wallet_index: number;
  chain_id: string;
  chain_type: string;
  wallet_client: string;
  wallet_client_type: string;
  connector_type: string;
  verified_at: number;
  first_verified_at: number;
  latest_verified_at: number;
  recovery_method: string;
};

type PrivyLinkedDiscord = {
  type: string; // type: 'discord_oauth'
  subject: string;
  username: string;
  email: string;
  verified_at: number;
  first_verified_at: number;
  latest_verified_at: number;
};

type PrivyLinkedGoogle = {
  type: string; // type: 'google_oauth'
  subject: string;
  email: string;
  name: string;
  verified_at: number;
  first_verified_at: number;
  latest_verified_at: number;
};

type PrivyLinkedEmail = {
  type: string; // type: 'email'
  address: string;
  verified_at: number;
  first_verified_at: number;
  latest_verified_at: number;
};

type PrivyLinkedPhone = {
  type: string; // type: 'phone';
  phoneNumber: string;
  verified_at: number;
  first_verified_at: number;
  latest_verified_at: number;
};
