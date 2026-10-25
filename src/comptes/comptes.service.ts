import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PasswordHasher} from "@nestjs/authentication";
import {Compte} from "./comptes.entity.js";
import {QueryFailedError, Repository} from "typeorm";

@Injectable()
export class ComptesService {
    constructor(
        @InjectRepository(Compte) private readonly comptesRepo: Repository<Compte>,
        private readonly passwordHasher: PasswordHasher,
    ) {}

    async findById(id: number): Promise<Compte> {
        const compte = await this.findByIdOrNull(id);
        if (!compte) { throw new NotFoundException('No compte'); }
        return compte;
    }

    findByIdOrNull(id: number): Promise<Compte | null> {
        return this.comptesRepo.findOneBy({id});
    }

    // seul endroit où on relit le mot de passe haché (select: false dans l'entité)
    findForLogin(email: string): Promise<Compte | null> {
        return this.comptesRepo.findOne({
            where: {email: email.trim().toLowerCase()},
            select: {id: true, motDePasse: true},
        });
    }

    async create(prenom: string, pseudo: string, email: string, motDePasse: string): Promise<Compte> {
        email = email.trim().toLowerCase();
        if (await this.comptesRepo.existsBy({email})) {
            throw new ConflictException('Cet email est déjà utilisé');
        }

        const compte = this.comptesRepo.create({prenom, pseudo, email, motDePasse: await this.passwordHasher.hash(motDePasse)});
        try {
            await this.comptesRepo.save(compte);
        } catch (e) {
            // 23505 = violation de contrainte unique
            if (e instanceof QueryFailedError && (e.driverError as { code?: string }).code === '23505') {
                throw new ConflictException('Cet email est déjà utilisé');
            }
            throw e;
        }
        return this.findById(compte.id);
    }
}
