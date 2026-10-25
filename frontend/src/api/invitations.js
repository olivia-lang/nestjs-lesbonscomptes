import { api } from './http';

export const mesInvitations = () => api.get('/invitations');

export const accepterInvitation = (id) => api.post(`/invitations/${id}/accepter`);

export const refuserInvitation = (id) => api.delete(`/invitations/${id}`);
