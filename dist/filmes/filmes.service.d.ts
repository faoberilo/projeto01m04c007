import { CreateFilmeDto } from './dto/create-filme.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filmes } from '@prisma/client';
export declare class FilmesService {
    private db;
    constructor(db: PrismaService);
    create(data: CreateFilmeDto): Promise<Filmes>;
    update(id: string, data: UpdateFilmeDto): Promise<Filmes>;
    list(): Promise<Filmes[]>;
    listById(id: string): Promise<Filmes>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
