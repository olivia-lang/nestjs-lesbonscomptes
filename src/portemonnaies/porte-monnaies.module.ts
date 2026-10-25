import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Portemonnaie} from "./entities/porte-monnaies.entity.js";
import {Participer} from "./entities/participer.entity.js";
import {PortemonnaiesController} from "./porte-monnaies.controller.js";
import {PortemonnaiesService} from "./porte-monnaies.service.js";
import {ComptesModule} from "../comptes/comptes.module.js";

@Module({
    imports: [TypeOrmModule.forFeature([Portemonnaie, Participer]), ComptesModule],
    controllers: [PortemonnaiesController],
    providers: [PortemonnaiesService],
    exports: [PortemonnaiesService],
})
export class PortemonnaiesModule {}