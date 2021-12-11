import { CreateFilmeDto } from './dto/create-filme.dto';
import { FilmesService } from './filmes.service';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filmes } from '@prisma/client';
export declare class FilmesController {
    private service;
    constructor(service: FilmesService);
    createFilme(data: CreateFilmeDto): Promise<Filmes>;
    updateFilme(id: string, data: UpdateFilmeDto): Promise<Filmes>;
    listFilmes(): Promise<Filmes[]>;
    listById(id: string): Promise<Filmes>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
