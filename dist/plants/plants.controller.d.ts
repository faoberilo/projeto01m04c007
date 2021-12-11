import { PlantsService } from './plants.service';
export declare class PlantsController {
    private service;
    constructor(service: PlantsService);
    CreatePlant(data: any): any[];
}
