import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
    return this.usersService.createUser(userData);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
