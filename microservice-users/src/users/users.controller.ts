import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }
}
