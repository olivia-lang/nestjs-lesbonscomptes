import { api } from './http';

export const creerPortemonnaie = (libelle) =>
    api.post('/portemonnaies', { libelle });

export const listerPortemonnaies = () =>
    api.get(`/portemonnaies`);

export const getPortemonnaie = (id) =>
    api.get(`/portemonnaies/${id}`);

export const cloturerPortemonnaie = (id) =>
    api.post(`/portemonnaies/${id}/cloturer`);

export const listerCompteInvitable= (id,email)=>
    api.get(`/portemonnaies/${id}/members/excluded?emailOrName=${email}`);

export const ajouterMembres= (id,memberIds)=>
    api.post(`/portemonnaies/${id}/members`,
        memberIds
    );