import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Portemonnaie} from "../portemonnaies/entities/porte-monnaies.entity.js";
import {Depense} from "../depenses/depenses.entity.js";
import {Participer} from "../portemonnaies/entities/participer.entity.js";

@Entity()
export class Compte {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    prenom: string;

    @Column({ unique: true })
    email: string;

    @Column()
    motDePasse: string;

    @OneToMany(() => Portemonnaie, (pm) => pm.createur)
    portemonnaies: Portemonnaie[];

    @OneToMany(() => Depense, (d) => d.payeur)
    depensesPayees: Depense[];

    @OneToMany(() => Depense, (d) => d.saisiPar)
    depensesSaisies: Depense[];

    @OneToMany(() => Participer, (participer) => participer.compte)
    participations: Participer[];
}