/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItemEntity } from './entities/menu_item.entity';
//import { Categories } from 'src/utility/common/menu-category.enum';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private menuItemRepository: Repository<MenuItemEntity>
  ) {}

  async getAllMenuItems(): Promise<MenuItemEntity[]> {
    return await this.menuItemRepository.find();
  }

  async createMenuItem(data: Partial<MenuItemEntity>): Promise<MenuItemEntity> {
    const menuItem = this.menuItemRepository.create(data);
    return await this.menuItemRepository.save(menuItem);
  }

  async updateMenuItem(id: number, data: Partial<MenuItemEntity>): Promise<MenuItemEntity> {
    const menuItem = await this.menuItemRepository.findOne({ where: { id } });
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }
    Object.assign(menuItem, data);
    return await this.menuItemRepository.save(menuItem);
  }

  async deleteMenuItem(id: number): Promise<void> {
    const result = await this.menuItemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Menu item not found');
    }
  }
}
