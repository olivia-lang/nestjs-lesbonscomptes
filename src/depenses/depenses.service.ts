import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {IsNull, Not, Repository} from "typeorm";
import {Depense} from "./depenses.entity.js";
import {Participer} from "../portemonnaies/entities/participer.entity.js";
import {Portemonnaie} from "../portemonnaies/entities/porte-monnaies.entity.js";
import {Compte} from "../comptes/comptes.entity.js";

@Injectable()
export class DepensesService {
    constructor(@InjectRepository(Depense) private readonly depenseRepository: Repository<Depense>,
                @InjectRepository(Portemonnaie) private readonly portemonnaieRepository: Repository<Portemonnaie>,
                @InjectRepository(Participer) private readonly participerRepository: Repository<Participer>,) {}

    async create(libelle: string, montant: number, portemonnaieId:number, compteId: number, saisiPar: Compte, payeurId: number|undefined): Promise<Depense> {
        // récupération du portemonnaie
        const portemonnaie = await this.portemonnaieRepository.findOneBy({ id: portemonnaieId });
        if (!portemonnaie) throw new NotFoundException('Porte-monnaie introuvable');

        await this.verifierParticipant(portemonnaieId, saisiPar.id);
        if (!portemonnaie.status) throw new BadRequestException('Le porte-monnaie est clos');

        // on récupère la personne qui a dépensé si ce n'est pas celle qui a saisi la dépense
        const payeur = payeurId && payeurId !== saisiPar.id ? await this.recupererParticipant(portemonnaieId, payeurId) : saisiPar;

        // on enregistre la dépense
        const depense = this.depenseRepository.create();
        depense.libelle = libelle;
        depense.montant = montant;
        depense.date_depense = new Date();
        depense.portemonnaie = portemonnaie;
        depense.payeur = payeur;
        depense.saisiPar = saisiPar;

        return this.depenseRepository.save(depense);
    }

    async findAllDepenses(portemonnaieId: number, compteId: number) {
        const portemonnaie = await this.portemonnaieRepository.findOneBy({id: portemonnaieId});

        if (!portemonnaie) throw new NotFoundException('Porte-monnaie introuvable');

        await this.verifierParticipant(portemonnaieId, compteId);

        const depenses = await this.depenseRepository.find({
            where: { portemonnaie: { id: portemonnaieId } },
            relations: { payeur: true, saisiPar: true },
            order: { date_depense: 'DESC' },
        });

        const total = depenses.reduce((somme, d) => somme + d.montant, 0);
        // seules les dépenses payées par le compte comptent, pas celles qu'il a saisies pour un autre
        const monTotal = depenses
            .filter((d) => d.payeur?.id === compteId)
            .reduce((somme, d) => somme + d.montant, 0);

        return {
            depenses: depenses.map((d) => ({
                id: d.id,
                libelle: d.libelle,
                montant: d.montant,
                date: d.date_depense,
                payeur: d.payeur ? { id: d.payeur.id, prenom: d.payeur.prenom, pseudo: d.payeur.pseudo } : null,
                saisiPar: { id: d.saisiPar.id, prenom: d.saisiPar.prenom, pseudo: d.saisiPar.pseudo },
            })),
            total,
            monTotal,
        };
    }

    private async verifierParticipant(portemonnaieId: number, compteId: number) {
        const existe = await this.participerRepository.exists({
            where: { portemonnaie: { id: portemonnaieId }, compte: { id: compteId }, dateAccepte: Not(IsNull()) },
        });
        if (!existe) throw new ForbiddenException("Vous n'êtes pas membre de ce porte-monnaie");
    }

    private async recupererParticipant(portemonnaieId: number, compteId: number): Promise<Compte> {
        const participation = await this.participerRepository.findOne({
            where: { portemonnaie: { id: portemonnaieId }, compte: { id: compteId }, dateAccepte: Not(IsNull()) },
            relations: { compte: true },
        });
        if (!participation) throw new ForbiddenException("Ce compte n'est pas membre de ce porte-monnaie");
        return participation.compte;
    }
}