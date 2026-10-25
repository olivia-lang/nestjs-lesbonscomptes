import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {AuthenticationModule} from "@nestjs/authentication";
import {ComptesModule} from "../comptes/comptes.module.js";
import {AuthController} from "./auth.controller.js";
import {JwtAuth} from "./jwt-auth.provider.js";
import "./auth.types.js";

@Module({
    imports: [
        // toutes les routes exigent un compte connecté, sauf celles marquées @Public()
        AuthenticationModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                accessToken: {key: config.getOrThrow<string>('JWT_SECRET'), ttl: '2h'},
                refreshToken: false,
            }),
        }),
        ComptesModule,
    ],
    controllers: [AuthController],
    providers: [JwtAuth],
})
export class AuthModule {}
