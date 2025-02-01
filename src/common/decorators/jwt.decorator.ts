// Decorator to set whether JWT is required or optional
// https://docs.nestjs.com/fundamentals/execution-context#reflection-and-metadata

import { SetMetadata } from '@nestjs/common';

export const JwtRequired = (jwtRequired: boolean) =>
  SetMetadata('jwtRequired', jwtRequired);
