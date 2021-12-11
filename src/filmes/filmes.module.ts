import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { FilmesController } from './filmes.controller';
import { FilmesService } from './filmes.service';

@Module({
  imports: [PassportModule.register({defaultStrategy:'jwt'}),],
  controllers: [FilmesController],
  providers: [FilmesService, PrismaService],
})
export class FilmesModule {}
