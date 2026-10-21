import {Body, Controller, Get, ParseIntPipe, Post, Query} from "@nestjs/common";
import {PortemonnaiesService} from "./porte-monnaies.service.js";
import {CreatePortemonnaieDto} from "./dto/create-portemonnaie.dto.js";

@Controller('portemonnaies')
export class PortemonnaiesController {
    constructor(private readonly portemonnaiesService: PortemonnaiesService) {}

    @Post()
    create(@Body() dto: CreatePortemonnaieDto) {
        return this.portemonnaiesService.create(dto.libelle, dto.compteId);
    }

    @Get()
    findAllForCompte(@Query('compteId', ParseIntPipe) compteId: number) {
        return this.portemonnaiesService.findAllForCompte(compteId);
    }
}