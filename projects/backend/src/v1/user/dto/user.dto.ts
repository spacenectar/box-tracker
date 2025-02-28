import { IsUUID, IsString, IsBoolean, IsOptional, IsEmail, MinLength } from 'class-validator';

export class UserBaseDto {
  @IsUUID()
  id: string;

  @IsString()
  authId: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsBoolean()
  @IsOptional()
  subscriber?: boolean;

  dateRegistered?: Date;
  dateLastLoggedIn?: Date;
}

export class CreateUserDto {
  @IsString()
  authId: string;

  @IsString()
  @MinLength(3)
  username: string;

  @IsBoolean()
  @IsOptional()
  subscriber?: boolean;
}

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  username?: string;

  @IsBoolean()
  @IsOptional()
  subscriber?: boolean;
}

export class UserResponseDto extends UserBaseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  photo?: string;
}
