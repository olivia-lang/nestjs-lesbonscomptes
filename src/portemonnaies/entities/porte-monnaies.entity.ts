import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "../../comptes/comptes.entity.js";

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
}