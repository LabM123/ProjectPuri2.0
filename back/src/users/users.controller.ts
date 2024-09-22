import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseUUIDPipe, Put, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/decorators/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('/admin')
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers() {
    return this.usersService.getAllUsersService();
  }
  
  @Get(':id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserByIdService(id);
  }
  
  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    if(createUserDto.password !== createUserDto.confirm_password) throw new BadRequestException('Ambas contraseñas deben ser iguales')
      return this.usersService.createUser(createUserDto);
  }
  
  @Post("/login")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }
  
  @Put(':id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserService(id, updateUserDto);
  }
  
  @Delete(':id')
  @Roles(Role.admin, Role.user)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUserService(id)
  }
}
