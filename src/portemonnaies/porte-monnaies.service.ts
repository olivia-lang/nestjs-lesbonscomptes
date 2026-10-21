import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Portemonnaie} from "./entities/porte-monnaies.entity.js";
import {Repository} from "typeorm";

@Injectable()
export class PortemonnaiesService {
    constructor(@InjectRepository(Portemonnaie) private readonly depenseRepository: Repository<Portemonnaie>,) {
    }
}