/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MenuItemService } from './menu_items.service';
import { MenuItemController } from './menu_items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemEntity } from './entities/menu_item.entity';


@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity])],  
  providers: [MenuItemService,],  
  controllers: [MenuItemController],
})
export class MenuItemModule {}
