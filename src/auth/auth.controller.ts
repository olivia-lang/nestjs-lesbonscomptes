import {Body, Controller, Get, HttpCode, Post, UnauthorizedException} from "@nestjs/common";
import {CurrentUser, PasswordHasher, Public, TokenService} from "@nestjs/authentication";
import {ComptesService} from "../comptes/comptes.service.js";
import {Compte} from "../comptes/comptes.entity.js";
import {ConnexionDto} from "./dto/connexion.dto.js";

@Controller('auth')
export class AuthController {
    constructor(private readonly comptesService: ComptesService,
                private readonly passwordHasher: PasswordHasher,
                private readonly tokens: TokenService) {}

    @Public()
    @Post('connexion')
    @HttpCode(200)
    async connexion(@Body() dto: ConnexionDto) {
        const compte = await this.comptesService.findForLogin(dto.email);
        if (!(await this.passwordHasher.verify(dto.motDePasse, compte?.motDePasse))) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        const {accessToken, expiresIn} = await this.tokens.issue(String(compte!.id), {method: 'password'});
        return {accessToken, expiresIn, compte: await this.comptesService.findById(compte!.id)};
    }

    @Get('moi')
    moi(@CurrentUser() compte: Compte) {
        return compte;
    }
}
