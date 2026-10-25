import { api } from './http';

export const creerCompte = ({ prenom, pseudo, email, motDePasse }) =>
    api.post('/comptes', { prenom, pseudo, email, motDePasse });
