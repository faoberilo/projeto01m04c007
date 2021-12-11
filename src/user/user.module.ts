import {  PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Module({
    imports: [PassportModule.register({defaultStrategy:'jwt'}),],
    providers: [UserService, PrismaService],
    controllers: [UserController],
  })

export class UserModule {}
