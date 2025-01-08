/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async updateUser(id: number, updateData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.getUserById(id);
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.usersRepository.remove(user);
  }
}
