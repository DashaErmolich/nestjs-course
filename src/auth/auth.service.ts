import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return await this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);

    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({ ...dto, password: hashPassword });
    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const isPasswordEquals = await bcrypt.compare(dto.password, user.password);

    if (user && isPasswordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect email or password' })
  }
}
