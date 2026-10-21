import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation} from "typeorm";
import {Compte} from "../../comptes/comptes.entity.js";
import {Depense} from "../../depenses/depenses.entity.js";
import {Participer} from "./participer.entity.js";

@Entity()
export class Portemonnaie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    libelle: string;

    @Column()
    status: boolean;

    @ManyToOne(() => Compte, (compte) => compte.portemonnaies)
    createur: Relation<Compte>;

    @OneToMany(() => Depense, (depense) => depense.portemonnaie)
    depenses: Relation<Depense[]>;

    @OneToMany(() => Participer, (participer) => participer.portemonnaie)
    participations: Relation<Participer[]>;
}