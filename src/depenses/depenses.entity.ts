import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Portemonnaie} from "../portemonnaies/entities/porte-monnaies.entity.js";

@Entity()
export class Depense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    montant: number;

    @Column()
    libelle: string;

    @Column({type: 'date'})
    date_depense: Date;

    @ManyToOne(() => Portemonnaie, (pm) => pm.depenses)
    portemonnaie: Portemonnaie;
}