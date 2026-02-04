import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/users/application/services/user.service";
import { RegisterDto } from "../dto/register.dto";
import { TokenResponseDto } from "../dto/token-response.dto";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto): Promise<TokenResponseDto> {
        if (dto.password !== dto.confirmpassword) {
            throw new BadRequestException("Password is not match")
        }
        const user = await this.userService.create(dto);
        const token = this.jwtService.sign({ sub: user.id, email: user.email })
        return {
            accessToken: token,
            user: user,
        }
    }

    async login(dto: LoginDto): Promise<TokenResponseDto> {
        const user = await this.userService.findByEmail(dto.email);
        const isPasswordValid = await bcrypt.compare(dto.password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException("Incorrect password")
        }
        const token = this.jwtService.sign({ sub: user.id, email: user.email })
        return {
            accessToken: token,
            user: user,
        }
    }
}