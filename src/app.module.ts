import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Depense} from "./depenses/depenses.entity.js";
import {Compte} from "./comptes/comptes.entity.js";
import {Portemonnaie} from "./portemonnaies/entities/porte-monnaies.entity.js";
import {Participer} from "./portemonnaies/entities/participer.entity.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({    // récupération des données dans .env en async
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Compte, Portemonnaie, Depense, Participer],
        synchronize: true, // ok en dev, jamais en prod
      }),
    }),
  ],
})
export class AppModule {}
