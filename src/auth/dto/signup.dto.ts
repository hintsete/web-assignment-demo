import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from "../../user/entities/user.entity";

export class SignUpDto {
  @IsString({ message: 'Name should be string' })
  @IsNotEmpty({ message: 'Name can not be null' })
  username: string;

  @IsString({ message: 'Name should be string' })
  @IsNotEmpty({ message: 'Name can not be null' })
  @MinLength(5, { message: 'password minimum character should be 5.' })
  password: string;

  @IsEmail({}, { message: 'please provide a valid email' })
  @IsNotEmpty({ message: 'Name can not be null' })
  email: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}