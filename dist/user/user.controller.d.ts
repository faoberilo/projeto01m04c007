import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
export declare class UserController {
    private service;
    constructor(service: UserService);
    createUser(data: CreateUserDto): Promise<User>;
    updateUser(id: string, data: UpdateUserDto): Promise<User>;
    listUsers(): Promise<any[]>;
    listById(id: string): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addList(user: User, filmeId: string): Promise<User & {
        filmes: import(".prisma/client").Filmes[];
    }>;
}
