import ListeCarte from "../ListeCarte.jsx";
import {useAuth} from "../../auth/auth-context.js";
import {useCallback, useEffect, useState} from "react";
import {mesInvitations} from "../../api/invitations.js";
import MesInvitations from "../invitations/MesInvitations.jsx";
import {Link} from "react-router";
import FiltresPortemonnaies from "./PortemonnaiesFiltres.jsx";

export default function PortemonnaiesList() {
    const { portemonnaies } = useAuth();
    const [invitations, setInvitations] = useState(null);
    const [erreur, setErreur] = useState(null);
    const [filtres, setFiltres] = useState("tous");

    const handleInvitations = useCallback(() => {
        mesInvitations()
            .then(setInvitations)
            .catch((err) => setErreur(err.message));
    }, []);

    useEffect(handleInvitations, [handleInvitations]);

    if (!portemonnaies) return <p>Chargement...</p>;

    const portemonnaiesFiltres = portemonnaies.filter((pm) => {
        if (filtres === 'ouverts') return pm.status === true;
        if (filtres === 'clos') return pm.status === false;
        return true;
    });

    return (
        <div className="container mt-4">
            <div className="row g-5">
                <div className="col-lg-8">
                    <h3 className="h3 mb-3">Mes porte-monnaies</h3>
                    <div className="card p-3 bg-white">
                        <Link to="/portemonnaies/nouveau" className="btn btn-outline-primary">Nouveau porte-monnaie</Link>
                        <FiltresPortemonnaies filtre={filtres} onChange={setFiltres} />
                        <ListeCarte items={portemonnaiesFiltres} />
                    </div>
                </div>

                <div className="col-lg-4">
                    <h3 className="h3 mb-3">Invitations</h3>
                        {erreur && <div className="alert alert-danger">{erreur}</div>}
                        {invitations && <MesInvitations invitations={invitations} onChange={handleInvitations} />}
                </div>
            </div>
        </div>
    );
}