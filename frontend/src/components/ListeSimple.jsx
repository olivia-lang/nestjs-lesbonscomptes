export default function ListeSimple({ items }) {
    if (items.length === 0) return <p>Aucun</p>;
    return (
        <ul>
            {items.map((pm) => (
                <li key={pm.id}>{pm.libelle}</li>
            ))}
        </ul>
    );
}