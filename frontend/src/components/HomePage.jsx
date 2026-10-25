import {Link} from "react-router";

function HomePage() {

return (
    <>
        <div className="container mt-4">
            <h1>Les bons comptes</h1>
            <div className="d-flex gap-2 mt-3">
                <Link to="/comptes/nouveau" className="btn btn-primary">Créer un compte</Link>
                <Link to="/portemonnaies/nouveau" className="btn btn-outline-primary">Nouveau porte-monnaie</Link>
            </div>
        </div>
    </>
);
}

export default HomePage;
