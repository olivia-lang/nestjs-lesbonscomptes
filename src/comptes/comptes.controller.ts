import {Body, Controller, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {ComptesService} from "./comptes.service.js";
import {CreateCompteDto} from "./dto/create-compte.dto.js";

@Controller('comptes')
export class ComptesController {
    constructor(private readonly comptesService: ComptesService) {
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.comptesService.findById(id);
    }

    @Post()
    create(@Body() dto: CreateCompteDto) {
        return this.comptesService.create(dto.prenom, dto.pseudo, dto.email, dto.motDePasse);
    }
}