/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MenuItemService } from './menu_items.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../utility/common/user-roles.enum';
import { RolesGuard } from '../auth/roles.guard';
import { RolesDecorator } from '../auth/roles.decorator';

@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  async getAllMenuItems() {
    return await this.menuItemService.getAllMenuItems();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.ADMIN)
  async createMenuItem(@Body() body: any) {
    return await this.menuItemService.createMenuItem(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.ADMIN)
  async updateMenuItem(@Param('id') id: number, @Body() body: any) {
    return await this.menuItemService.updateMenuItem(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.ADMIN)
  async deleteMenuItem(@Param('id') id: number) {
    return await this.menuItemService.deleteMenuItem(id);
  }
}
