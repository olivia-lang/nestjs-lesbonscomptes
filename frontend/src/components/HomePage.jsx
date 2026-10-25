import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router";
import {useAuth} from "../auth/auth-context.js";
import {mesInvitations} from "../api/invitations.js";
import MesInvitations from "./invitations/MesInvitations.jsx";

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
                    <Link to="/portemonnaies/nouveau" className="btn btn-outline-primary">Nouveau porte-monnaie</Link>

                </div>
            </div>
        );
    }

 }
export default HomePage;
