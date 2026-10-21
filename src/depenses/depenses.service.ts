import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Depense} from "./depenses.entity.js";

@Injectable()
export class DepensesService {
    constructor(@InjectRepository(Depense) private readonly depenseRepository: Repository<Depense>,) {
    }
}