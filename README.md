# Lesbonscomptes

## Equipe
- Ronan CUNIN ([@ETS-Ronan](https://github.com/ETS-Ronan))
- Olivia LANG ([@olivia-lang](https://github.com/olivia-lang))
- Julien MIROUX ([@Frontaz1](https://github.com/Frontaz1))
- Xavier MOYON ([@Moyon-Xavier](https://github.com/Moyon-Xavier))

## Introduction

Dans le cadre du cours d'Infrastructures & Frameworks, nous avons créé ce projet afin de mettre en pratique le framework **NestJS** basé sur du TypeScript.
Le front a été fait avec NextJS.

## Fonctionnalités

Lesbonscomptes est une application de gestion de dépenses partagées. Elle comprend : 
- la création d'un compte et la connexion
- la création d'un porte-monnaie et la visualisation des détails (dépenses, participants, montant total dépensés etc.)
- l'invitation d'une personne à un porte-monnaie : une personne peut refuser ou accepter d'y participer
- la suppression d'une dépense, seulement par la personne qui l'a saisi
- la clotûre d'un porte-monnaie : à la fermeture, aucune dépense ne peut être ajoutée
- pour chaque participant, on peut voir combien il doit recevoir et combien il doit

## Pré-requis

Il vous faut Docker Desktop et Node v24 pour lancer ce projet. Nous avons utilisé une base de données Postgres, utilisez un fichier <code>.env</code> pour les credentials de votre base de données. Il vous faudra également une clé secrète JWT à générer et à compléter dans le fichier <code>.env</code>.

## Installation et lancement

A la racine du projet et à la racine du dossier <code>frontend/</code>, lancez la commande : 
```bash
$ npm install
```

Pour lancer NestJS, dans un terminal à la racine du projet, lancez cette commande : 
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Pour lancer le front, dans un autre terminal, à la racine du dossier <code>frontend/</code>, lancez la commande : 
```bash
# development
$ npm run dev
```

## 

