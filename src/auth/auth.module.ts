import { jwtConstants } from './jwt.constants';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports:  [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
      expiresIn: '30m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [JwtStrategy,PassportModule],
})
export class AuthModule {}
