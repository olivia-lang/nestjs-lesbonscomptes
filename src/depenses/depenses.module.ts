import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Portemonnaie} from "../portemonnaies/entities/porte-monnaies.entity.js";
import {Participer} from "../portemonnaies/entities/participer.entity.js";
import {ComptesModule} from "../comptes/comptes.module.js";
import {Depense} from "./depenses.entity.js";
import {DepensesService} from "./depenses.service.js";
import {DepensesController} from "./depenses.controller.js";

@Module({
    imports: [TypeOrmModule.forFeature([Depense, Portemonnaie, Participer]), ComptesModule],
    controllers: [DepensesController],
    providers: [DepensesService],
})
export class DepensesModule {}