import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {cloturerPortemonnaie, getPortemonnaie} from "../../api/porte-monnaies.js";
import {formatDateFr} from "../../utils/formatDate.js";
import {useAuth} from "../../auth/auth-context.js";

export default function PortemonnaieDetail() {
    const { id } = useParams();
    const { compte, refreshPortemonnaies } = useAuth();
    const [portemonnaie, setPortemonnaie] = useState(null);
    const [erreur, setErreur] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getPortemonnaie(id)
            .then(setPortemonnaie)
            .catch((err) => setErreur(err.message));
    }, [id]);

    async function cloturer() {
        if (!window.confirm('Clôturer ce porte-monnaie ? On ne pourra plus ajouter de dépense.')) return;
        setErreur(null);
        try {
            setPortemonnaie(await cloturerPortemonnaie(id));
            await refreshPortemonnaies();
        } catch (err) {
            setErreur(err.message);
        }
    }

    if (erreur && !portemonnaie) return <div className="container mt-4"><div className="alert alert-danger">{erreur}</div></div>;
    if (!portemonnaie) return <p>Chargement...</p>;

    return (
        <div className="container mt-4">
            <div className="d-flex align-items-center gap-2 mb-1">
                <h3 className="h3 mb-0">{portemonnaie.libelle}</h3>
                {portemonnaie.status
                    ? <span className="badge bg-success">Ouvert</span>
                    : <span className="badge bg-secondary">Clos</span>}
                {portemonnaie.status && portemonnaie.createur.id === compte.id && (
                    <button type="button" onClick={cloturer} className="btn btn-outline-danger btn-sm ms-auto">Clôturer</button>
                )}
            </div>
            <p className="text-secondary">
                Créé le {formatDateFr(portemonnaie.dateCreation)} par @{portemonnaie.createur.pseudo}
            </p>

            {erreur && <div className="alert alert-danger">{erreur}</div>}

            <div className="card p-3 bg-white gap-3">
                <h2 className="h5 mb-3">Participants ({portemonnaie.participants.length})</h2>
                <ul className="list-group">
                    {portemonnaie.participants.map((c) => (
                        <li key={c.id} className="list-group-item">
                            {c.prenom} <small className="text-muted ms-1">@{c.pseudo}</small>
                        </li>
                    ))}
                </ul>
                {portemonnaie.status && (
                    <button type="button" onClick={() => navigate(`/portemonnaies/${id}/depenses/nouveau`)} className="btn btn-outline-success">Ajouter une dépense</button>
                )}
            </div>
        </div>
    );
}
