import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "../../comptes/comptes.entity.js";
import {Depense} from "../../depenses/depenses.entity.js";

@Entity()
export class Portemonnaie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    libelle: string;

    @Column()
    status: boolean;

    @ManyToOne(() => Compte, (compte) => compte.portemonnaies)
    createur: Compte;

    @OneToMany(() => Depense, (depense) => depense.portemonnaie)
    depenses: Depense[];
}