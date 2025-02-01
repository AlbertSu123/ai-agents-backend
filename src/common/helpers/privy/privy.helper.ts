import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  PrivyUser,
  PrivyUserDetails,
} from 'src/common/helpers/privy/privy.dto';

@Injectable()
export class PrivyService {
  constructor(
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  /**
   * Get user from Privy
   * @param userDid
   * @returns Promise<PrivyUser | null>
   */
  async getUser(did: string): Promise<PrivyUser | null> {
    // https://docs.privy.io/guide/server/users/get
    try {
      const response = await fetch(
        `https://auth.privy.io/api/v1/users/did:privy:${did}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.config.get('privy.appId')}:${this.config.get('privy.appSecret')}`).toString('base64')}`,
            'privy-app-id': this.config.get('privy.appId'),
          },
        },
      );
      return response.json();
    } catch (error) {
      return null;
    }
  }

  userInfo(user: PrivyUser): PrivyUserDetails {
    let username: string = null,
      address: string = null,
      email: string = null,
      phone: string = null;

    for (const account of user.linked_accounts) {
      switch (account.type) {
        case 'wallet':
          address = account.address;
          break;
        case 'google_oauth':
          username = account.name;
          email = account.email;
          break;
        case 'email':
          email = account.email;
          break;
        case 'phone':
          phone = account.phoneNumber.replace(/ /g, '');
          break;
        case 'discord_oauth':
          if (!username) {
            username = account.username;
          }
          if (!email) {
            email = account.email;
          }
          break;
      }
    }
    return { username, address, email, phone };
  }
}
