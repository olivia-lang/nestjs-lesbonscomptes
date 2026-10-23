import { api } from './http';

export const creerPortemonnaie = (libelle, compteId) =>
    api.post('/portemonnaies', { libelle, compteId });

export const listerPortemonnaies = (compteId) =>
    api.get(`/portemonnaies?compteId=${compteId}`);