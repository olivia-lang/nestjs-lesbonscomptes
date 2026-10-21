import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreatePortemonnaieDto {
    @IsString()
    @IsNotEmpty()
    libelle: string;

    @IsInt()        // à supprimer quand l'auth sera mise en place
    compteId: number;
}