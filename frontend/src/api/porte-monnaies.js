import { api } from './http';

export const creerPortemonnaie = (libelle, compteId) =>
    api.post('/portemonnaies', { libelle, compteId });