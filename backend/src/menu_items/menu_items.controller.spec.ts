/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MenuItemController } from './menu_items.controller';
import { MenuItemService } from './menu_items.service';

describe('MenuItemsController', () => {
  let controller: MenuItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuItemController],
      providers: [MenuItemService],
    }).compile();

    controller = module.get<MenuItemController>(MenuItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
