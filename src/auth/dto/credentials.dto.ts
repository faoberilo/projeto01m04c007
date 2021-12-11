import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CredentialsDto{
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    @IsString()
    @IsEmail()
    email:string;
   
    @IsString()
    @IsNotEmpty({message:"Esse campo nao pode ser vazio!!!"})
    @Length(6,10)
    senha:string;   
}