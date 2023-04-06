import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto, checkUsernameDto, ValidateDto } from './dtos/auth.dto';
import { authUserSchema } from './dtos/auth.joi';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import { UsersService } from 'src/users/users.service';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { REFERSH_TOKEN_KEY } from 'src/utils/const';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  @UsePipes(new JoiValidationPipe(authUserSchema))
  signup(@Body() createUserDto: AuthDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @UsePipes(new JoiValidationPipe(authUserSchema))
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['id'];
    return this.authService.refreshAccessToken(userId);
  }

  @Post('check-username')
  async checkUniqueUsername(@Body() data: checkUsernameDto) {
    const res = await this.userService.findByUsername(data.username);
    return { isUnique: !res };
  }

  @UseGuards(AccessTokenGuard)
  @Post('validate-session')
  async validateSession(@Req() req: Request, @Body() data: ValidateDto) {
    const res = await this.authService.validateToken({
      id: req.user['id'],
      jwt: data.jwt.split(' ')[1],
      keyName: REFERSH_TOKEN_KEY,
    });
    return res;
  }
}
