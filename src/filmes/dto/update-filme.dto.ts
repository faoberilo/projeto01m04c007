import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateFilmeDto {
    @IsString({message:"Informe um nome válido"})
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    nome:string;

    @IsInt({message:"Informe um ano válido!!!"})
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    ano:number;
    
    @IsString({message:"Informe um genero válido"})
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    genero:string;

    @IsString({message:"Informe um nome válido"})
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    atores:string;

    @IsString({message:"Informe um nome válido"})
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    produtores:string;
    }