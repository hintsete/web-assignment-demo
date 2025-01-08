import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { AuthRolesGuard } from 'src/guards/auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('protected')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthRolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // @Roles(UserRole.ADMIN)
  // @UseGuards(AuthRolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
