import { Module } from "@nestjs/common";
import { UserModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./infrastructure/controllers/auth.controller";
import { AuthService } from "./application/services/auth.service";
import { JwtStrategy } from "./infrastructure/strategies/jwt.strategy";
import { JwtAuthGuard } from "./infrastructure/guards/jwt-auth.guard";
import type { StringValue } from "ms";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions: { expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '7d') as StringValue }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [JwtAuthGuard]
})

export class AuthModule { }