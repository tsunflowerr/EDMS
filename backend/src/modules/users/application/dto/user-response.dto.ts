import { Expose } from "class-transformer";
import { UserRole } from "../../domain/enums/user-role.enum";


export class UserResponseDto {
    @Expose()
    id: string;
    @Expose()
    email: string;
    @Expose()
    fullName: string;
    @Expose()
    avatar: string;
    @Expose()
    role: UserRole;
    @Expose()
    isActive: boolean;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
}