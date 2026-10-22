import {Link} from "react-router";

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
                    {pm.libelle}
                </Link>
            ))}
        </div>
    );
}