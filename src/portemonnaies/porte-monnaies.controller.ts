import {Body, Controller, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {PortemonnaiesService} from "./porte-monnaies.service.js";
import {CreatePortemonnaieDto} from "./dto/create-portemonnaie.dto.js";
import {CurrentUser} from "@nestjs/authentication";
import {Compte} from "../comptes/comptes.entity.js";

@Controller('portemonnaies')
export class PortemonnaiesController {
    constructor(private readonly portemonnaiesService: PortemonnaiesService) {}

    @Post()
    create(@Body() dto: CreatePortemonnaieDto, @CurrentUser() user: Compte) {
        return this.portemonnaiesService.create(dto.libelle, user.id);
    }

    @Get()
    findAllForCompte(@CurrentUser() compte: Compte) {
        return this.portemonnaiesService.findAllForCompte(compte.id);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() compte: Compte) {
        return this.portemonnaiesService.findOneForCompte(id, compte.id);
    }

    @Post(':id/cloturer')
    cloturer(@Param('id', ParseIntPipe) id: number, @CurrentUser() compte: Compte) {
        return this.portemonnaiesService.cloturer(id, compte.id);
    }
}