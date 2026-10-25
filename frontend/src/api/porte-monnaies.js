import { api } from './http';

export const creerPortemonnaie = (libelle) =>
    api.post('/portemonnaies', { libelle });

export const listerPortemonnaies = () =>
    api.get(`/portemonnaies`);