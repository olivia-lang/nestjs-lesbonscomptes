import {Link} from "react-router";
import { Users } from 'lucide-react';
import {formatDateFr} from "../utils/formatDate.js";

export default function ListeCarte({ items }) {
    if (items.length === 0) return <p>Aucun</p>;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map((pm) => (
                <Link
                    key={pm.id}
                    to={`/portemonnaies/${pm.id}`}
                    state={{ libelle: pm.libelle }}
                    style={{
                        display: 'block',
                        padding: '1rem',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'inherit',
                        minWidth: '160px',
                    }}
                >
                    <div>
                        <p className="fs-4 fw-semibold text-dark">{pm.libelle}</p>
                    </div>
                    <div className="text-secondary">
                        <span>{formatDateFr(pm.dateCreation)}</span>
                        <div className="d-flex align-items-center gap-1">
                            <Users size={18} />
                            {pm.nombreParticipants}
                        </div>
                    </div>

                </Link>
            ))}
        </div>
    );
}