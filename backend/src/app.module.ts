import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { MenuItemsModule } from './menu_items/menu_items.module';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
      envFilePath: '.env', // Path to your environment variables file
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    MenuItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
