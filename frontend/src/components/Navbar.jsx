import {Link, useNavigate} from "react-router";
import {useAuth} from "../auth/auth-context.js";

export default function Navbar() {
    const { compte, seDeconnecter } = useAuth();
    const navigate = useNavigate();

    function handleDeconnexion() {
        seDeconnecter();
        navigate('/connexion');
    }

    return (
        <nav className="navbar bg-white border-bottom">
            <div className="container">
                <Link to="/" className="navbar-brand">Les bons comptes</Link>
                {compte ? (
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-muted">@{compte.pseudo}</span>
                        <button onClick={handleDeconnexion} className="btn btn-outline-secondary btn-sm">Se déconnecter</button>
                    </div>
                ) : (
                    <div className="d-flex gap-2">
                        <Link to="/connexion" className="btn btn-outline-primary btn-sm">Se connecter</Link>
                        <Link to="/comptes/nouveau" className="btn btn-primary btn-sm">Créer un compte</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
