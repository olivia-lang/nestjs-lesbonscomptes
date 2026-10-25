import { api } from './http';

export const connexion = (email, motDePasse) =>
    api.post('/auth/connexion', { email, motDePasse });

export const moi = () => api.get('/auth/moi');
