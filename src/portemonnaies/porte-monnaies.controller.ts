import {Body, Controller, Post} from "@nestjs/common";
import {PortemonnaiesService} from "./porte-monnaies.service.js";
import {CreatePortemonnaieDto} from "./dto/create-portemonnaie.dto.js";

@Controller('portemonnaies')
export class PortemonnaiesController {
    constructor(private readonly portemonnaiesService: PortemonnaiesService) {}

    @Post()
    create(@Body() dto: CreatePortemonnaieDto) {
        return this.portemonnaiesService.create(dto.libelle, dto.compteId);
    }
}