import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (private db : PrismaService, private jwt: JwtService){}
    
    async login(data:CredentialsDto){
        const userExis = await this.db.user.findUnique({
            where: {email: data.email},
        });
        if(!userExis){
            throw new ConflictException('Email não cadastrado!!!');
        }

        const senhaValida = await bcrypt.compare(data.senha, userExis.senha);
        if (senhaValida){
            const ingresso = {
                email: userExis.email,
            };
            const token = await this.jwt.sign(ingresso);
            return {token};
        } else{
            throw new UnauthorizedException ("Senhas não conferem!!!");
        }
        
    }
}
