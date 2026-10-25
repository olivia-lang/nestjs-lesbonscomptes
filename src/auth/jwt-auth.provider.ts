import {Injectable} from "@nestjs/common";
import {AuthenticationRegistry, JwtBearerProvider, type JwtClaims} from "@nestjs/authentication";
import {ComptesService} from "../comptes/comptes.service.js";
import {Compte} from "../comptes/comptes.entity.js";

@Injectable()
export class JwtAuth extends JwtBearerProvider<Compte> {
    constructor(private readonly comptesService: ComptesService, registry: AuthenticationRegistry) {
        super();
        registry.registerProvider(this);
    }

    validate({sub: compteId}: JwtClaims) {
        // compte supprimé depuis la connexion → null → 401
        return compteId ? this.comptesService.findByIdOrNull(Number(compteId)) : null;
    }
}
