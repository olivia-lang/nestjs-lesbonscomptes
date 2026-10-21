import { useEffect, useState } from 'react';
import ListeSimple from "../ListeSimple.jsx";
import {listerPortemonnaies} from "../../api/porte-monnaies.js";

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
        <div className="container mt-4 gap-3">
            <h3 className="h3 mb-3">Mes porte-monnaies</h3>

            <div className="card p-3 bg-white">
                <p>Porte-monnaies actifs</p>
                <ListeSimple items={portemonnaies.ouverts} />
            </div>

            <div className="card p-3 bg-white">
                <p>Porte-monnaies clos</p>
                <ListeSimple items={portemonnaies.clos} />
            </div>
        </div>
    );
}