import {useCallback, useEffect, useState} from "react";
import {AuthContext} from "./auth-context.js";
import {connexion, moi} from "../api/auth.js";

export default function AuthProvider({ children }) {
    const [compte, setCompte] = useState(null);
    const [chargement, setChargement] = useState(() => !!localStorage.getItem('token'));

    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        moi()
            .then(setCompte)
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setChargement(false));
    }, []);

    useEffect(() => {
        const onExpiree = () => setCompte(null);
        window.addEventListener('session-expiree', onExpiree);
        return () => window.removeEventListener('session-expiree', onExpiree);
    }, []);

    const seConnecter = useCallback(async (email, motDePasse) => {
        const { accessToken, compte } = await connexion(email, motDePasse);
        localStorage.setItem('token', accessToken);
        setCompte(compte);
    }, []);

    const seDeconnecter = useCallback(() => {
        localStorage.removeItem('token');
        setCompte(null);
    }, []);

    return (
        <AuthContext.Provider value={{ compte, chargement, seConnecter, seDeconnecter }}>
            {children}
        </AuthContext.Provider>
    );
}
