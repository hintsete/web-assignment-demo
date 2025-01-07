/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.register(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password
    );
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<{ token: string }> {
    return this.userService.login(createUserDto.email, createUserDto.password);
  }

  @Get()
  async findAll(){
    // Ensure this method is implemented in UserService
    return this.userService.findAll(); 
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findById(+id);
    if (!user) {
      throw new NotFoundException('User not found'); // Handle user not found
    }
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
    // You'll need to implement the update method in your UserService
    //const updatedUser = await this.userService.update(+id, updateUserDto); 
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.userService.remove(+id);
  }
  
  @Patch(':id/role')
  @UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  async updateRole(
    @Param('id') id: number,
    @Body() { roles }: { roles: string[] },
  ): Promise<any> {
    return this.userService.updateUserRole(id, roles); 
  }

}