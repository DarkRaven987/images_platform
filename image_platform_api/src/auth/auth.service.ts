import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dtos/users.dto';
import { AuthDto, ValidateServiceDto } from './dtos/auth.dto';
import { hashData } from 'src/utils';
import {
  ACCESS_TOKEN_EXPIRE_KEY,
  ACCESS_TOKEN_KEY,
  REFERSH_TOKEN_EXPIRE_KEY,
  REFERSH_TOKEN_KEY,
} from 'src/utils/const';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    await this.usersService.create(createUserDto);
    return { message: 'OK' };
  }

  async signIn(data: AuthDto) {
    const user = await this.usersService.findByUsername(data.username);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = user.password === hashData(data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.PK, user.username);
    delete user.password;
    return { user, ...tokens };
  }

  async getTokens(id: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          username,
        },
        {
          secret: this.configService.get(ACCESS_TOKEN_KEY),
          expiresIn: this.configService.get(ACCESS_TOKEN_EXPIRE_KEY),
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          username,
        },
        {
          secret: this.configService.get(REFERSH_TOKEN_KEY),
          expiresIn: this.configService.get(REFERSH_TOKEN_EXPIRE_KEY),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(id: string) {
    const user = await this.usersService.findById(id);
    if (!user) throw new ForbiddenException('Access Denied');

    const token = await this.jwtService.signAsync(
      {
        sub: id,
        username: user.username,
      },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRE'),
      },
    );
    return {
      accessToken: token,
    };
  }

  async validateToken(validateServiceDto: ValidateServiceDto) {
    try {
      const { jwt, keyName } = validateServiceDto;
      return this.jwtService.verify(jwt, {
        secret: this.configService.get(keyName),
      });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
