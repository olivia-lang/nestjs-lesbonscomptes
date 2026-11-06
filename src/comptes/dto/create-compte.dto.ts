import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Matches, MaxLength, MinLength} from 'class-validator';

export class CreateCompteDto {
    @ApiPropertyOptional({
        type: String,
        description: 'Prénom de l\'utilisateur',
        example:"Cedric",

    })
    @Matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: 'Le prénom ne doit contenir que des lettres, espaces, tirets ou apostrophes' })
    @IsNotEmpty({ message: 'Le prénom est obligatoire' })
    prenom: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Speudo de l\'utilisateur',
        example:"cedLePlusFort",
        minLength:3,
        maxLength:30
    })
    @Matches(/^[a-zA-Z0-9_.-]+$/, { message: 'Le pseudo ne doit contenir que des lettres, chiffres, points, tirets ou underscores' })
    @MinLength(3, { message: 'Le pseudo doit faire au moins 3 caractères' })
    @MaxLength(30, { message: 'Le pseudo doit faire au plus 30 caractères' })
    pseudo: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Email de l\'utilisateur',
        example:"cedric.diggory@gmail.com",
        required:true

    })
    @IsEmail({}, { message: "L'email n'est pas valide" })
    @IsNotEmpty({ message: "L'email est obligatoire" })
    email: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Mot de passe de l\'utilisateur',
        example:"TheNameOfTheDoctor%$78avbhjf",
        minLength:8
    })
    @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
    motDePasse: string;
}
