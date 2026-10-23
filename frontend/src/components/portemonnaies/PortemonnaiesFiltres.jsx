import { List, Unlock, Lock } from 'lucide-react';

const FILTRES = [
    { valeur: 'tous', label: 'Tous', Icone: List },
    { valeur: 'ouverts', label: 'Ouverts', Icone: Unlock },
    { valeur: 'clos', label: 'Clos', Icone: Lock },
];

export default function FiltresPortemonnaies({ filtre, onChange }) {
    return (
        <div className="nav nav-pills bg-light p-1 rounded-3 d-inline-flex gap-1 mb-4">
            {FILTRES.map(({ valeur, label, Icone }) => {
                const actif = filtre === valeur;
                return (
                    <button
                        key={valeur}
                        onClick={() => onChange(valeur)}
                        className={`nav-link d-flex align-items-center gap-2 ${filtre === valeur ? 'bg-success-subtle text-success-emphasis fw-semibold'
                            : 'text-secondary'}`}
                    >
                        <Icone size={16} />
                        {label}
                    </button>
                );
            })}
        </div>
    );
}