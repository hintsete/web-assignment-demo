/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../user/entities/user.entity';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async signUp(name: string, email: string, password: string): Promise<UserEntity> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = this.userRepository.create({ name, email, password: hashedPassword });
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error in signUp:', error.message, error.stack);
      throw new Error('Internal Server Error');
    }
  }
  
  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}