import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto{
    @IsString({message:"Informe um nome válido"})
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    nome:string;
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    @IsString()
    @IsEmail()
    email:string;
    @IsString()
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    nascimento:string;
    @IsString()
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    @Length(6,10)
    senha:string;
    @IsString()
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    @Length(6,10)
    confirmacaoSenha:string;
}