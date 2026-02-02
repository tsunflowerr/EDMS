import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../../domain/enums/user-role.enum";
import { User } from "../../domain/entities/user.entity";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @MinLength(6)
    fullname?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole
}