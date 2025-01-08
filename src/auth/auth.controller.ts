import {
  Body,
  Controller,
 
  HttpCode,
  Post,
 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string; message: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @HttpCode(200)
  login(@Body() loginDto: LoginDto): Promise<{ token: string; message:string }> {
    return this.authService.login(loginDto);
  }
}
