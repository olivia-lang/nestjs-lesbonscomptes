import {IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator';

export class CreateCompteDto {
    @Matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: 'Le nom ne doit contenir que des lettres, espaces, tirets ou apostrophes' })
    @IsNotEmpty()
    nom: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    motDePasse: string;
}