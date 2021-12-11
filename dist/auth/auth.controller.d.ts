import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dados: CredentialsDto): Promise<{
        token: string;
    }>;
    profile(user: User): User;
}
