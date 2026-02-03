import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domain/entities/user.entity";
import { UserController } from "./infrastructure/controllers/user.controller";
import { UserService } from "./application/services/user.service";
import { UserRepository } from "./infrastructure/repositories/user.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [UserService, {
        provide: 'IUserRepository',
        useClass: UserRepository,
    },
    ],
    exports: [UserService],
})
export class UserModule { }