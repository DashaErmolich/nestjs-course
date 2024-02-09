import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, type: User })
  @Post('/registration')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }
}
