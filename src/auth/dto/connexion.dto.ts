import {IsEmail, IsNotEmpty} from "class-validator";

export class ConnexionDto {
    @IsEmail({}, { message: "L'email n'est pas valide" })
    email: string;

    @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
    motDePasse: string;
}
