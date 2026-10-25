import {InjectRepository} from "@nestjs/typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";
import {Participer} from "../portemonnaies/entities/participer.entity.js";
import {IsNull, Repository} from "typeorm";

@Injectable()
export class InvitationsService {
    constructor(@InjectRepository(Participer) private participerRepository: Repository<Participer>,) {
    }

    // invitations reçues par le compte et pas encore acceptées
    findInvitations(compteId: number): Promise<Participer[]> {
        return this.participerRepository.find({
            where: {compte: {id: compteId}, dateAccepte: IsNull()},
            relations: {portemonnaie: {createur: true}},
            order: {dateInvitation: 'DESC'},
        });
    }

    async accepter(id: number, compteId: number): Promise<Participer> {
        const invitation = await this.findInvitation(id, compteId);
        invitation.dateAccepte = new Date();
        return this.participerRepository.save(invitation);
    }

    async refuser(id: number, compteId: number): Promise<void> {
        await this.participerRepository.remove(await this.findInvitation(id, compteId));
    }

    // uniquement une invitation en attente qui appartient au compte, sinon 404
    private async findInvitation(id: number, compteId: number): Promise<Participer> {
        const invitation = await this.participerRepository.findOne({
            where: {id, compte: {id: compteId}, dateAccepte: IsNull()},
            relations: {portemonnaie: true},
        });
        if (!invitation) { throw new NotFoundException('Invitation introuvable'); }
        return invitation;
    }
}
