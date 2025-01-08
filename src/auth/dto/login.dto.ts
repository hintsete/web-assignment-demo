import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from "../../user/entities/user.entity";

export class LoginDto {

  @IsString({ message: 'Name should be string' })
  @IsNotEmpty({ message: 'Name can not be null' })
  @MinLength(6, { message: 'password minimum character should be 6.' })
  password: string;

  @IsEmail({}, { message: 'please provide a valid email' })
  @IsNotEmpty({ message: 'Name can not be null' })
  email: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}