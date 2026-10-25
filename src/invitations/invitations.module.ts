import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Participer} from "../portemonnaies/entities/participer.entity.js";
import {InvitationsController} from "./invitations.controller.js";
import {InvitationsService} from "./invitations.service.js";

@Module({
    imports: [TypeOrmModule.forFeature([Participer])],
    controllers: [InvitationsController],
    providers: [InvitationsService],
})
export class InvitationsModule {}
