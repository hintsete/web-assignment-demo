/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
    return await this.authService.signUp(name, email, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return await this.authService.login(email, password);
  }
}
