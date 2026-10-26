import {useCallback, useEffect, useState} from "react";
import {AuthContext} from "./auth-context.js";
import {connexion, moi} from "../api/auth.js";
import {listerPortemonnaies} from "../api/porte-monnaies.js";

export default function AuthProvider({ children }) {
    const [compte, setCompte] = useState(null);
    const [portemonnaies, setPortemonnaies] = useState(null);
    const [chargement, setChargement] = useState(() => !!localStorage.getItem('token'));

    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        Promise.all([moi(), listerPortemonnaies()])
            .then(([compteRecu, portemonnaiesRecues]) => {
                setCompte(compteRecu);
                setPortemonnaies(portemonnaiesRecues);
            })
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setChargement(false));
    }, []);

    useEffect(() => {
        const onExpiree = () => {
            setCompte(null);
            setPortemonnaies(null);
        }
        window.addEventListener('session-expiree', onExpiree);
        return () => window.removeEventListener('session-expiree', onExpiree);
    }, []);

    const seConnecter = useCallback(async (email, motDePasse) => {
        const { accessToken, compte, portemonnaies } = await connexion(email, motDePasse);
        localStorage.setItem('token', accessToken);
        setCompte(compte);
        setPortemonnaies(portemonnaies);
    }, []);

    const refreshPortemonnaies = useCallback(async () => {
        setPortemonnaies(await listerPortemonnaies());
    }, []);

    const seDeconnecter = useCallback(() => {
        localStorage.removeItem('token');
        setCompte(null);
        setPortemonnaies(null);
    }, []);

    return (
        <AuthContext.Provider value={{ compte, chargement, seConnecter, seDeconnecter, portemonnaies, refreshPortemonnaies }}>
            {children}
        </AuthContext.Provider>
    );
}
