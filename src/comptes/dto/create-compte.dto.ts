import {IsEmail, IsNotEmpty, Matches, MaxLength, MinLength} from 'class-validator';

export class CreateCompteDto {
    @Matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: 'Le prénom ne doit contenir que des lettres, espaces, tirets ou apostrophes' })
    @IsNotEmpty({ message: 'Le prénom est obligatoire' })
    prenom: string;

    @Matches(/^[a-zA-Z0-9_.-]+$/, { message: 'Le pseudo ne doit contenir que des lettres, chiffres, points, tirets ou underscores' })
    @MinLength(3, { message: 'Le pseudo doit faire au moins 3 caractères' })
    @MaxLength(30, { message: 'Le pseudo doit faire au plus 30 caractères' })
    pseudo: string;

    @IsEmail({}, { message: "L'email n'est pas valide" })
    @IsNotEmpty({ message: "L'email est obligatoire" })
    email: string;

    @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
    motDePasse: string;
}
