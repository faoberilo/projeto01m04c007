import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private db;
    private jwt;
    constructor(db: PrismaService, jwt: JwtService);
    login(data: CredentialsDto): Promise<{
        token: string;
    }>;
}
