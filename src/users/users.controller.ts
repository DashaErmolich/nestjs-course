import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService,
  ) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'All users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({ status: 200 })
  @UseGuards(JWTAuthGuard, RolesGuard)
  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200 })
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }
}
