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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmesController = void 0;
const create_filme_dto_1 = require("./dto/create-filme.dto");
const common_1 = require("@nestjs/common");
const filmes_service_1 = require("./filmes.service");
const update_filme_dto_1 = require("./dto/update-filme.dto");
const passport_1 = require("@nestjs/passport");
let FilmesController = class FilmesController {
    constructor(service) {
        this.service = service;
    }
    createFilme(data) {
        return this.service.create(data);
    }
    updateFilme(id, data) {
        return this.service.update(id, data);
    }
    listFilmes() {
        return this.service.list();
    }
    listById(id) {
        return this.service.listById(id);
    }
    deleteById(id) {
        return this.service.delete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_filme_dto_1.CreateFilmeDto]),
    __metadata("design:returntype", Promise)
], FilmesController.prototype, "createFilme", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_filme_dto_1.UpdateFilmeDto]),
    __metadata("design:returntype", Promise)
], FilmesController.prototype, "updateFilme", null);
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FilmesController.prototype, "listFilmes", null);
__decorate([
    (0, common_1.Get)('list/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilmesController.prototype, "listById", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FilmesController.prototype, "deleteById", null);
FilmesController = __decorate([
    (0, common_1.Controller)('filmes'),
    __metadata("design:paramtypes", [filmes_service_1.FilmesService])
], FilmesController);
exports.FilmesController = FilmesController;
//# sourceMappingURL=filmes.controller.js.map