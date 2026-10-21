import {InjectRepository} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {Participer} from "./entities/participer.entity.js";
import {Repository} from "typeorm";

@Injectable()
export class ParticiperService {
    constructor(@InjectRepository(Participer) private participerRepository: Repository<Participer>,) {
    }
}
