import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { PrivyJwtPayload } from 'src/common/helpers/privy/privy.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  // Use reflector to access additional properties added using SetMetadata
  constructor(
    private reflector: Reflector,
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizationHeader: string = context.switchToHttp().getRequest()
      .headers?.authorization;

    // Check if JWT is mandatory or optional
    const jwtRequired = this.reflector.get<boolean>(
      'jwtRequired',
      context.getHandler(),
    );

    // Check if authorization header exists
    if (authorizationHeader) {
      try {
        const privyToken = authorizationHeader.split('Bearer ')[1];
        // Verify authorization header JWT
        const jwtData = await this.jwtService.verifyAsync<PrivyJwtPayload>(
          privyToken,
          {
            algorithms: ['ES256'],
            publicKey: this.config.get('privy.verificationKey'),
            issuer: 'privy.io',
            audience: this.config.get('privy.appId'),
          },
        );
        // Pass decoded JWT back to request context
        context.switchToHttp().getRequest().jwtData = {
          ...jwtData,
          sub: jwtData.sub.split('did:privy:')[1],
        };
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
    } else if (jwtRequired) {
      // Throw error if JWT is not optional
      throw new UnauthorizedException('Missing Authorization header');
    }
    return true;
  }
}
