import {Body, Controller, Post} from "@nestjs/common";
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
}