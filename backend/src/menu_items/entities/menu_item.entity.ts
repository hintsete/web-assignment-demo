/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Categories } from "src/utility/common/menu-category.enum";

@Entity('menu_item')
export class MenuItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @Column()
  image_url: string;

  @Column({
    type: "enum",
    enum: Categories,
    array: true 
  })
  categories: Categories[];
}
