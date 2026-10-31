import {Body, Controller, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {DepensesService} from "./depenses.service.js";
import {CreatePortemonnaieDto} from "./dto/create-depense.dto.js";
import {CurrentUser} from "@nestjs/authentication";
import {Compte} from "../comptes/comptes.entity.js";

@Controller('portemonnaies/:id/depenses')
export class DepensesController {

    constructor(private readonly depensesService: DepensesService) {}

    @Post()
    create(@Body() dto: CreatePortemonnaieDto, @Param('id', ParseIntPipe) portemonnaieId: number, @CurrentUser() user: Compte) {
        return this.depensesService.create(dto.libelle, dto.montant, portemonnaieId, user.id, user, dto.payeurId);
    }

    @Get()
    getDepenses(@Param('id', ParseIntPipe) portemonnaieId: number, @CurrentUser() user: Compte) {
        return this.depensesService.findAllDepenses(portemonnaieId, user.id);
    }
}