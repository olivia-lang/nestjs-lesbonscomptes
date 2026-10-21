import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Portemonnaie} from "../portemonnaies/entities/porte-monnaies.entity.js";

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
}