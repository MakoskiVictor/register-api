import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(2)
  firstname: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(2)
  lastname: string;
  @IsEmail()
  email: string;
  @Transform(({ value }) => value.trim()) //Limpiar espacios en blanco
  @IsString()
  @MinLength(6)
  password: string;
}
