import { CreateFilmeDto } from './dto/create-filme.dto';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filmes } from '@prisma/client';

@Injectable()
export class FilmesService {
    constructor(private db: PrismaService){}

    async create(data:CreateFilmeDto):Promise<Filmes>{
        const filmeExist = await this.db.filmes.findUnique({
            where: { nome: data.nome },
            });
        if (filmeExist){
            throw new ConflictException('Filme já está cadastrado');
        }
        const filme = await this.db.filmes.create({data});
        return filme;
    }

    async update(id: string, data: UpdateFilmeDto): Promise<Filmes>{
        return this.db.filmes.update({
        where: { id: id },
        data,
        });
    }
    
    async list(): Promise<Filmes[]>{
        const filmes = await this.db.filmes.findMany();
        return filmes;
    }

    async listById(id:string): Promise<Filmes>{
        const filme = await this.db.filmes.findUnique({
            where:{id},
        });
        if(!filme){
            throw new NotFoundException('O Id informado não foi encontrado no banco de dados!!!')
        }
        return filme;
    }

    async delete(id:string): Promise<{message:string}>{
        const filme= await this.db.filmes.findUnique({
            where:{id},
        });
        if(!filme){
            throw new NotFoundException('O Id informado não foi encontrado no banco de dados!!!')
        } else{
            await this.db.filmes.delete({
                where:{id},
            });            
        }              
        return {message:"Filme deletado com sucesso!!!"}
    };
}
