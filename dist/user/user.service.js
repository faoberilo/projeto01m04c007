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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(db) {
        this.db = db;
    }
    async createUser(dadosUser) {
        if (dadosUser.senha !== dadosUser.confirmacaoSenha) {
            throw new common_1.UnauthorizedException("Senha e confirmacao de senha devem ser iguais");
        }
        const userExis = await this.db.user.findUnique({
            where: { email: dadosUser.email },
        });
        if (userExis) {
            throw new common_1.ConflictException('Email já cadastrado!!!');
        }
        const saltos = 10;
        const hashSenha = await bcrypt.hash(dadosUser.senha, saltos);
        delete dadosUser.confirmacaoSenha;
        const user = await this.db.user.create({
            data: Object.assign(Object.assign({}, dadosUser), { senha: hashSenha })
        });
        delete user.senha;
        return user;
    }
    async updateUser(id, dadosUser) {
        const user = await this.db.user.update({
            data: dadosUser,
            where: { id: id },
        });
        delete user.senha;
        return user;
    }
    async listUsers() {
        const user = await this.db.user.findMany();
        const userSemSenha = user.map((_a) => {
            var { senha } = _a, resto = __rest(_a, ["senha"]);
            return resto;
        });
        return userSemSenha;
    }
    async listById(id) {
        const user = await this.db.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('O Id informado não foi encontrado no banco de dados!!!');
        }
        delete user.senha;
        return user;
    }
    async delete(id) {
        const user = await this.db.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('O Id informado não foi encontrado no banco de dados!!!');
        }
        else {
            await this.db.user.delete({
                where: { id },
            });
        }
        return { message: "Usuário deletado com sucesso!!!" };
    }
    ;
    async addList(user, filmeId) {
        const filme = await this.db.filmes.findUnique({
            where: { id: filmeId },
        });
        if (!filme) {
            throw new common_1.NotFoundException("Filmes não encontrado!!!");
        }
        const usuario = await this.db.user.update({
            where: { id: user.id },
            data: {
                filmes: {
                    connect: {
                        id: filme.id,
                    },
                },
            },
            include: {
                filmes: true,
            },
        });
        delete usuario.senha;
        return usuario;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map