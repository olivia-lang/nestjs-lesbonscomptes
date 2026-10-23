export function formatDateFr(dateIso) {
    return new Date(dateIso).toLocaleDateString('fr-FR');
}