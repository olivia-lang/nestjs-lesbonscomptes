import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Compte} from "./comptes.entity.js";
import {Repository} from "typeorm";

@Injectable()
export class ComptesService {
    constructor(
        @InjectRepository(Compte) private readonly comptesRepo: Repository<Compte>,
    ) {}
}