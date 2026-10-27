import {IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreatePortemonnaieDto {
    @IsString()
    @IsNotEmpty()
    libelle: string;

    @IsNumber()
    montant: number;

    @IsOptional()
    @IsInt()
    payeurId?: number;
}