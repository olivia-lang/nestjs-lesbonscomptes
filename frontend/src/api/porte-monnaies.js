import { api } from './http';

export const creerPortemonnaie = (libelle) =>
    api.post('/portemonnaies', { libelle });

export const listerPortemonnaies = () =>
    api.get(`/portemonnaies`);

export const getPortemonnaie = (id) =>
    api.get(`/portemonnaies/${id}`);

export const cloturerPortemonnaie = (id) =>
    api.post(`/portemonnaies/${id}/cloturer`);