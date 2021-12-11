import { CreateFilmeDto } from './dto/create-filme.dto';
import { Controller, Post, Body, Param, Patch, Get, Delete, UseGuards} from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filmes } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('filmes')
export class FilmesController {
    constructor(private service: FilmesService) {}

    @UseGuards(AuthGuard())
    @Post('create')
    createFilme(@Body() data: CreateFilmeDto):Promise<Filmes> {
        return this.service.create(data);
        }
    
    @UseGuards(AuthGuard())
    @Patch('update/:id')
    updateFilme(@Param('id') id:string, @Body()data:UpdateFilmeDto):Promise<Filmes>{
        return this.service.update(id,data);
    }

    @Get('list')
    listFilmes():Promise <Filmes[]>{
        return this.service.list();
    }

    @Get('list/:id')
    listById(@Param('id') id:string):Promise <Filmes>{
        return this.service.listById(id);
    }
    
    @UseGuards(AuthGuard())
    @Delete('delete/:id')
    deleteById(@Param('id') id:string):Promise<{message:string}>{
        return this.service.delete(id);
    }
}
