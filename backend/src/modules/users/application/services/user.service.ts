import { Injectable, ConflictException, NotFoundException, Inject, BadRequestException } from "@nestjs/common";
import type { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { UserResponseDto } from "../dto/user-response.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const existing = await this.userRepository.findByEmail(dto.email);
        if (existing) {
            throw new ConflictException('Email already exists')
        }
        const user = new User();
        user.email = dto.email;
        user.password = await bcrypt.hash(dto.password, 10);

        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll()
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);
        Object.assign(user, dto);
        return this.userRepository.save(user);
    }

    async changePassword(id: string, dto: ChangePasswordDto): Promise<void> {
        const user = await this.findById(id);
        const isPasswordValid = await bcrypt.compare(dto.currentPassword, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Current password is incorrect');
        }
        if (dto.newPassword !== dto.confirmPassword) {
            throw new BadRequestException('Password do not match');
        }
        user.password = await bcrypt.hash(dto.newPassword, 10);
        await this.userRepository.save(user);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.userRepository.delete(id);
    }
}