import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtRequired } from 'src/common/decorators/jwt.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Request } from '../common/dto/global.dto';
import { UserService } from './user.service';
import { GetOrCreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @JwtRequired(true)
  @UseGuards(AuthGuard)
  @Post('/')
  @HttpCode(200)
  async createUser(@Req() request: Request, @Body() body: GetOrCreateUserDto) {
    const user = await this.userService.get({ id: request.jwtData.sub });
    if (!user) {
      const newUser = await this.userService.create({
        id: request.jwtData.sub,
        address: body.address,
      });
      await this.userService.save(newUser);
      return newUser;
    }
    return user;
  }
}
