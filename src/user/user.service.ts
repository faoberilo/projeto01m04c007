import { Injectable, ConflictException, UnauthorizedException, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import {User} from '@prisma/client';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserService {
    constructor(private db: PrismaService){}
    
    async createUser(dadosUser: CreateUserDto):Promise <User> {

        if(dadosUser.senha !== dadosUser.confirmacaoSenha){
            throw new UnauthorizedException("Senha e confirmacao de senha devem ser iguais")
        }
        const userExis = await this.db.user.findUnique({
            where: {email: dadosUser.email},
        });
        if(userExis){
            throw new ConflictException('Email já cadastrado!!!');
        }
        const saltos=10;
        const hashSenha = await bcrypt.hash(dadosUser.senha, saltos);
        delete dadosUser.confirmacaoSenha;


        const user = await this.db.user.create({
            data: {
                ...dadosUser,
                senha:hashSenha,
            }});
        delete user.senha;
        return user;

    }
    async updateUser(id:string, dadosUser: UpdateUserDto): Promise <User> {
        const user = await this.db.user.update({
            data: dadosUser,
            where:{id:id},
        })
        delete user.senha;
        return user;
    }
    async listUsers(): Promise<any[]>{
        const user = await this.db.user.findMany();
        const userSemSenha = user.map(({senha, ...resto})=> resto);
        return userSemSenha;
    }

    async listById(id:string): Promise<User>{
        const user = await this.db.user.findUnique({
            where:{id},
        });
        if(!user){
            throw new NotFoundException('O Id informado não foi encontrado no banco de dados!!!')
        }
        delete user.senha;
        return user;
    }

    async delete(id:string): Promise<{message:string}>{
        const user = await this.db.user.findUnique({
            where:{id},
        });
        if(!user){
            throw new NotFoundException('O Id informado não foi encontrado no banco de dados!!!')
        } else{
            await this.db.user.delete({
                where:{id},
            });            
        }
               
        return {message:"Usuário deletado com sucesso!!!"}
    };

    async addList (user: User, filmeId: string){
        const filme = await this.db.filmes.findUnique({
            where: {id:filmeId},
        });
        if(!filme){
            throw new NotFoundException("Filmes não encontrado!!!")
        }

        const usuario = await this.db.user.update({
            where: {id: user.id},
            data: {
                filmes:{
                    connect:{
                        id:filme.id,
                    },
                },
            },
            include:{
                filmes: true,
            },
        });
        delete usuario.senha;
        return usuario;
    }


}
