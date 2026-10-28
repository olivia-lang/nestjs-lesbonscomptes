import { api } from './http';

export const creerDepense = (portemonnaieId, { libelle, montant, payeurId }) =>
    api.post(`/portemonnaies/${portemonnaieId}/depenses`, { libelle, montant, payeurId });

export const getDepenses = (portemonnaieId) => api.get(`/portemonnaies/${portemonnaieId}/depenses`);