import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Compte} from "./comptes.entity.js";
import {Repository} from "typeorm";

@Injectable()
export class ComptesService {
    constructor(
        @InjectRepository(Compte) private readonly comptesRepo: Repository<Compte>,
    ) {}

    async findById(id: number): Promise<Compte> {
        const compte = await this.comptesRepo.findOneBy({id});
        if (!compte) { throw new NotFoundException('No compte'); }
        return compte;
    }

    create(prenom: string, email: string, motDePasse: string): Promise<Compte> {
        const compte = this.comptesRepo.create({prenom, email, motDePasse});
        return this.comptesRepo.save(compte);
    }
}