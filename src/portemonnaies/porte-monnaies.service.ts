import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
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
            relations: { portemonnaie: { participations: true }, compte: true },
            order: { portemonnaie: { dateCreation: 'DESC' } },
        });

        return participations
            .filter((p) => p.dateAccepte !== null)
            .map((p) => ({
                id: p.portemonnaie.id,
                libelle: p.portemonnaie.libelle,
                status: p.portemonnaie.status,
                dateCreation: p.portemonnaie.dateCreation,
                nombreParticipants: p.portemonnaie.participations.filter((x) => x.dateAccepte !== null).length,
            }));
    }

    async findOneForCompte(id: number, compteId: number) {
        const portemonnaie = await this.portemonnaieRepository.findOne({
            where: { id },
            relations: { createur: true, participations: { compte: true } },
        });
        if (!portemonnaie) { throw new NotFoundException('Porte-monnaie introuvable'); }

        const participants = portemonnaie.participations
            .filter((p) => p.dateAccepte !== null)
            .map((p) => p.compte);
        // seuls les participants qui ont accepté peuvent voir le porte-monnaie
        if (!participants.some((c) => c.id === compteId)) { throw new NotFoundException('Porte-monnaie introuvable'); }

        return {
            id: portemonnaie.id,
            libelle: portemonnaie.libelle,
            status: portemonnaie.status,
            dateCreation: portemonnaie.dateCreation,
            createur: portemonnaie.createur,
            participants,
        };
    }

    async cloturer(id: number, compteId: number) {
        const portemonnaie = await this.findOneForCompte(id, compteId);
        if (portemonnaie.createur.id !== compteId) { throw new ForbiddenException('Seul le créateur peut clôturer le porte-monnaie'); }
        if (!portemonnaie.status) { throw new BadRequestException('Le porte-monnaie est déjà clos'); }

        await this.portemonnaieRepository.update(id, { status: false });
        portemonnaie.status = false;
        return portemonnaie;
    }

}