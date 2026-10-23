import { useEffect, useState } from 'react';
import {listerPortemonnaies} from "../../api/porte-monnaies.js";
import ListeCarte from "../ListeCarte.jsx";

const COMPTE_ID_SIMULE = 1;

export default function PortemonnaiesList() {
    const [portemonnaies, setPortemonnaies] = useState(null);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        listerPortemonnaies(COMPTE_ID_SIMULE)
            .then(setPortemonnaies)
            .catch((err) => setErreur(err.message));
    }, []);

    if (erreur) return <p style={{ color: 'red' }}>{erreur}</p>;
    if (!portemonnaies) return <p>Chargement...</p>;

    return (
        <div className="container mt-4">
            <div className="row g-5">
                <div className="col-lg-8">
                    <h3 className="h3 mb-3">Mes porte-monnaies</h3>
                    <div className="card p-3 bg-white">
                        <ListeCarte items={portemonnaies} />
                    </div>
                </div>

                <div className="col-lg-4">
                    <h3 className="h3 mb-3">Invitations</h3>
                    <div className="card p-3 bg-white">
                        {/* à modifier */}
                    </div>
                </div>
            </div>
        </div>
    );
}