import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portemonnaie} from "./porte-monnaies.entity.js";
import {Depense} from "../../depenses/depenses.entity.js";
import {Compte} from "../../comptes/comptes.entity.js";

@Entity()
export class Participer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    dateInvitation: Date;

    @Column({ type: 'date', nullable: true })
    dateAccepte: Date | null;

    @ManyToOne(() => Portemonnaie, (pm) => pm.participations)
    portemonnaie: Portemonnaie;

    @ManyToOne(() => Compte, (compte) => compte.participations)
    compte: Compte;
}