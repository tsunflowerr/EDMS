import { UserResponseDto } from "src/modules/users/application/dto/user-response.dto"

export class TokenResponseDto {
    accessToken: string;
    user: UserResponseDto;
}