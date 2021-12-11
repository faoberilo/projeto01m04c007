import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private db;
    constructor(db: PrismaService);
    createUser(dadosUser: CreateUserDto): Promise<User>;
    updateUser(id: string, dadosUser: UpdateUserDto): Promise<User>;
    listUsers(): Promise<any[]>;
    listById(id: string): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
    addList(user: User, filmeId: string): Promise<User & {
        filmes: import(".prisma/client").Filmes[];
    }>;
}
