/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';
import { MenuItemEntity } from './entities/menu_item.entity';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  getAllMenuItems(
    @Query('category') category?: string,
  ): Promise<MenuItemEntity[]> {
    if (category) {
      return this.menuItemsService.getMenuItemsByCategory(category);
    }
    return this.menuItemsService.getAllMenuItems();
  }

  @Get(':id')
  getMenuItemById(@Param('id', ParseIntPipe) id: number): Promise<MenuItemEntity> {
    return this.menuItemsService.getMenuItemById(id);
  }

  @Post()
  createMenuItem(
    @Body() menuItemData: Partial<MenuItemEntity>,
  ): Promise<MenuItemEntity> {
    return this.menuItemsService.createMenuItem(menuItemData);
  }

  @Put(':id')
  updateMenuItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<MenuItemEntity>,
  ): Promise<MenuItemEntity> {
    return this.menuItemsService.updateMenuItem(id, updateData);
  }

  @Delete(':id')
  deleteMenuItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.menuItemsService.deleteMenuItem(id);
  }
}
