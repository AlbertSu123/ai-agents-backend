import { Body, Controller, HttpCode, Inject, Post, Req } from '@nestjs/common';
import { JwtRequired } from 'src/common/decorators/jwt.decorator';
import { Request } from '../common/dto/global.dto';
import { UserService } from './user.service';
import { GetOrCreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @JwtRequired(true)
  @Post('/')
  @HttpCode(200)
  async createUser(@Req() request: Request, @Body() body: GetOrCreateUserDto) {
    const user = await this.userService.get({ address: body.address });
    if (!user) {
      const newUser = await this.userService.create({
        address: body.address,
        twitterHandle: body.twitterHandle,
      });
      await this.userService.save(newUser);
      return newUser;
    }
    return user;
  }
}
