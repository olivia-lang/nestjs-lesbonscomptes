import {Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Body,Query} from "@nestjs/common";
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

    @Post(':id/members')
    @HttpCode(200)
    addMember(@Param('id', ParseIntPipe)id : number, @Body() accounts: Array<number>,@CurrentUser() compte: Compte){
        this.portemonnaiesService.addMember(id,accounts,compte.id)
    }

    @Get(':id/members/excluded')
    @HttpCode(200)
    findInvitableMembers(@Param('id', ParseIntPipe)id : number, @Query('emailOrName') emailOrName: string, @CurrentUser() compte: Compte){
        return this.portemonnaiesService.findInvitableMembers(id,emailOrName,compte.id);
    }
}