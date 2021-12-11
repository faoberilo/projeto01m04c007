import { jwtConstants } from './jwt.constants';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt} from "passport-jwt";3
import { PrismaService } from "src/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private db: PrismaService){
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate (payload:{email:string}){
        const {email} = payload;
        const user = await this.db.user.findUnique({
            where:{email},
        });
        if(!user){
            throw new UnauthorizedException('Usuário nao encontrado');
        }

        return user;
    }
}