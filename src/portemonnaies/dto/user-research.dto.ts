import {IsNotEmpty, IsString,IsEmail, IsBoolean} from "class-validator";

export class UserResearchDto {
    @IsString()
    @IsNotEmpty()
    userName: string;
    
    @IsEmail()
    userEmail: string;

    @IsBoolean()
    alreadyInvited: boolean;
}