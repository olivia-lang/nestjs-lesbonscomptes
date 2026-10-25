import {Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post} from "@nestjs/common";
import {CurrentUser} from "@nestjs/authentication";
import {InvitationsService} from "./invitations.service.js";
import {Compte} from "../comptes/comptes.entity.js";

@Controller('invitations')
export class InvitationsController {
    constructor(private readonly invitationsService: InvitationsService) {}

    @Get()
    findMine(@CurrentUser() moi: Compte) {
        return this.invitationsService.findInvitations(moi.id);
    }

    @Post(':id/accepter')
    @HttpCode(200)
    accepter(@Param('id', ParseIntPipe) id: number, @CurrentUser() moi: Compte) {
        return this.invitationsService.accepter(id, moi.id);
    }

    @Delete(':id')
    @HttpCode(204)
    refuser(@Param('id', ParseIntPipe) id: number, @CurrentUser() moi: Compte) {
        return this.invitationsService.refuser(id, moi.id);
    }
}
