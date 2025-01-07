import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity'; // Adjust the path as needed

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // Ensure your UserEntity is imported
    JwtModule.register({
      secret: 'dfudjfhindalekfncmlnafdkcmndf', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust the token expiration as needed
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export the UserService if needed elsewhere
})
export class UserModule {}
