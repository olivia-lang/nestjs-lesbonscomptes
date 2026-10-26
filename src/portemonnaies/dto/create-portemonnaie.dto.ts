import {IsNotEmpty, IsString} from "class-validator";

export class CreatePortemonnaieDto {
    @IsString()
    @IsNotEmpty()
    libelle: string;
}