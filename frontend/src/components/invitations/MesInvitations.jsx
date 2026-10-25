import {useState} from "react";
import {accepterInvitation, refuserInvitation} from "../../api/invitations.js";

export default function MesInvitations({ invitations, onChange }) {
    const [erreur, setErreur] = useState(null);

    async function repondre(action, id) {
        setErreur(null);
        try {
            await action(id);
            onChange();
        } catch (err) {
            setErreur(err.message);
        }
    }

    return (
        <section className="card p-3 bg-white">
            <h2 className="h5 mb-3">Mes invitations</h2>

            {invitations.length === 0 ? (
                <p className="text-muted mb-0">Aucune invitation en attente.</p>
            ) : (
                <ul className="list-group">
                    {invitations.map((inv) => (
                        <li key={inv.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <strong>{inv.portemonnaie.libelle}</strong>
                                <small className="text-muted ms-2">de @{inv.portemonnaie.createur.pseudo}</small>
                            </span>
                            <span className="d-flex gap-2">
                                <button onClick={() => repondre(accepterInvitation, inv.id)} className="btn btn-success btn-sm">Accepter</button>
                                <button onClick={() => repondre(refuserInvitation, inv.id)} className="btn btn-outline-danger btn-sm">Refuser</button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}

            {erreur && <div className="alert alert-danger mt-3 mb-0">{erreur}</div>}
        </section>
    );
}
