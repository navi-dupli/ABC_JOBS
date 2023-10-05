import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {DeleteResult, Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id: id });
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }

        // Actualiza el usuario con los datos del DTO
        Object.assign(user, updateUserDto);

        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }
}
