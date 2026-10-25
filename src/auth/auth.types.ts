import type {Compte} from "../comptes/comptes.entity.js";

// indique à @nestjs/authentication le type de l'utilisateur connecté (@CurrentUser())
// et qu'on n'utilise pas de refresh token : on se reconnecte quand le jeton expire
declare module '@nestjs/authentication' {
    interface AuthenticationTypes {
        user: Compte;
        refreshTokens: false;
    }
}
