import { IsEmail, IsString, IsOptional, IsEnum, IsBoolean, IsNumber } from "class-validator";
import { UserRole } from "../../domain/enums/user-role.enum";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsString()
    avatar?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}