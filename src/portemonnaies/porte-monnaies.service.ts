import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Portemonnaie} from "./entities/porte-monnaies.entity.js";
import {Repository} from "typeorm";
import {ComptesService} from "../comptes/comptes.service.js";
import {Compte} from "../comptes/comptes.entity.js";
import {Participer} from "./entities/participer.entity.js";

@Injectable()
export class PortemonnaiesService {
    constructor(@InjectRepository(Portemonnaie) private readonly portemonnaieRepository: Repository<Portemonnaie>,
                @InjectRepository(Participer) private readonly participationRepository: Repository<Participer>,
                private readonly compteRepository: ComptesService,) {
    }

    async create(libelle: string, compteId: number) {
        // création du portemonnaie
        const createur = await this.compteRepository.findById(compteId);

        const portemonnaie = this.portemonnaieRepository.create();
        portemonnaie.libelle = libelle;
        portemonnaie.status = true; // vérifie le nom exact — voir remarque plus bas
        portemonnaie.createur = createur;
        await this.portemonnaieRepository.save(portemonnaie);

        // on ajoute le créateur en tant que participant du portemonnaie
        const participation = this.participationRepository.create();
        participation.compte = createur;
        participation.portemonnaie = portemonnaie;
        participation.dateInvitation = new Date();
        participation.dateAccepte = new Date();
        await this.participationRepository.save(participation);

        return portemonnaie;
    }

    async findAllForCompte(compteId: number) {
        const participations = await this.participationRepository.find({
            where: { compte: { id: compteId } },
            relations: { portemonnaie: true, compte: true },
            order: { portemonnaie: { dateCreation: 'DESC' } },
        });

        return participations
            .filter((p) => p.dateAccepte !== null)
            .map((p) => p.portemonnaie);
    }

}