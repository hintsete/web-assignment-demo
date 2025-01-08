/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItemEntity } from './entities/menu_item.entity';
import { Categories } from 'src/utility/common/menu-category.enum';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private menuItemsRepository: Repository<MenuItemEntity>,
  ) {}

  async getAllMenuItems(): Promise<MenuItemEntity[]> {
    return this.menuItemsRepository.find();
  }

  async getMenuItemById(id: number): Promise<MenuItemEntity> {
    const menuItem = await this.menuItemsRepository.findOne({ where: { id } });
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menuItem;
  }

  async createMenuItem(menuItemData: Partial<MenuItemEntity>): Promise<MenuItemEntity> {
    const menuItem = this.menuItemsRepository.create(menuItemData);
    return this.menuItemsRepository.save(menuItem);
  }

  async updateMenuItem(
    id: number,
    updateData: Partial<MenuItemEntity>,
  ): Promise<MenuItemEntity> {
    const menuItem = await this.getMenuItemById(id);
    Object.assign(menuItem, updateData);
    return this.menuItemsRepository.save(menuItem);
  }

  async deleteMenuItem(id: number): Promise<void> {
    const menuItem = await this.getMenuItemById(id);
    await this.menuItemsRepository.remove(menuItem);
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItemEntity[]> {
    // Validate that the category exists in the Categories enum
    if (!Object.values(Categories).includes(category as Categories)) {
      throw new BadRequestException(`Invalid category: ${category}`);
    }

    // Query for menu items with the specified category
    return this.menuItemsRepository.find({
      where: { categories: category as Categories },
    });
  }
}
