import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from "@nestjs/common";
import { UserService } from "../../application/services/user.service";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { UpdateUserDto } from "../../application/dto/update-user.dto";
import { ChangePasswordDto } from "../../application/dto/change-password.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }

    @Patch(':id/password')
    @HttpCode(HttpStatus.NO_CONTENT)
    changePassword(@Param('id') id: string, @Body() dto: ChangePasswordDto) {
        return this.userService.changePassword(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}
