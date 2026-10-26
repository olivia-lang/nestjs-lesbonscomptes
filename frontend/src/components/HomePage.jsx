import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router";
import {useAuth} from "../auth/auth-context.js";
import {mesInvitations} from "../api/invitations.js";
import MesInvitations from "./invitations/MesInvitations.jsx";
import PortemonnaiesList from "./portemonnaies/PortemonnaiesList.jsx";

function HomePage() {
    const { compte } = useAuth();

    if (!compte) {
        return (
            <div className="container mt-4">
                <h1>Les bons comptes</h1>
                <p className="lead">Partagez vos dépenses entre amis.</p>
                <div className="d-flex gap-2 mt-3">
                    <Link to="/connexion" className="btn btn-primary">Se connecter</Link>
                    <Link to="/comptes/nouveau" className="btn btn-outline-primary">Créer un compte</Link>

                </div>
            </div>
        );
    }

    return <PortemonnaiesList />;
}

// plus utilisé depuis la liste des porte-monnaies, gardé au cas où
function TableauDeBord({ prenom }) {
    const [invitations, setInvitations] = useState(null);
    const [erreur, setErreur] = useState(null);

    const charger = useCallback(() => {
        mesInvitations()
            .then(setInvitations)
            .catch((err) => setErreur(err.message));
    }, []);

    useEffect(charger, [charger]);

    return (
        <div className="container mt-4">
            <h1 className="h3 mb-4">Bonjour {prenom}</h1>
            {erreur && <div className="alert alert-danger">{erreur}</div>}
            {invitations && <MesInvitations invitations={invitations} onChange={charger} />}
        </div>
    );
}

export default HomePage;
