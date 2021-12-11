"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let FilmesService = class FilmesService {
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        const filmeExist = await this.db.filmes.findUnique({
            where: { nome: data.nome },
        });
        if (filmeExist) {
            throw new common_1.ConflictException('Filme já está cadastrado');
        }
        const filme = await this.db.filmes.create({ data });
        return filme;
    }
    async update(id, data) {
        return this.db.filmes.update({
            where: { id: id },
            data,
        });
    }
    async list() {
        const filmes = await this.db.filmes.findMany();
        return filmes;
    }
    async listById(id) {
        const filme = await this.db.filmes.findUnique({
            where: { id },
        });
        if (!filme) {
            throw new common_1.NotFoundException('O Id informado não foi encontrado no banco de dados!!!');
        }
        return filme;
    }
    async delete(id) {
        const filme = await this.db.filmes.findUnique({
            where: { id },
        });
        if (!filme) {
            throw new common_1.NotFoundException('O Id informado não foi encontrado no banco de dados!!!');
        }
        else {
            await this.db.filmes.delete({
                where: { id },
            });
        }
        return { message: "Filme deletado com sucesso!!!" };
    }
    ;
};
FilmesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FilmesService);
exports.FilmesService = FilmesService;
//# sourceMappingURL=filmes.service.js.map