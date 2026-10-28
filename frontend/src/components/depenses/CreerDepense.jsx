import {creerDepense} from "../../api/depenses.js";
import {useEffect, useState} from "react";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {useNavigate, useParams} from "react-router";
import {useAuth} from "../../auth/auth-context.js";
import {getPortemonnaie} from "../../api/porte-monnaies.js";
import * as Yup from "yup";

const schema = Yup.object({
    libelle: Yup.string().required('Le libellé est obligatoire'),
    montant: Yup.number()
        .typeError('Le montant doit être un nombre')
        .required('Le montant est obligatoire'),
    payeurId: Yup.number().required(),
});

export default function CreerDepense() {
    const { id } = useParams();
    const { compte } = useAuth();
    const navigate = useNavigate();
    const [portemonnaie, setPortemonnaie] = useState(null);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        getPortemonnaie(id)
            .then(setPortemonnaie)
            .catch((err) => setErreur(err.message));
    }, [id]);

    async function handleSubmit(values, { setSubmitting }) {
        setErreur(null);
        try {
            await creerDepense(id, {...values, payeurId: Number(values.payeurId)});
            navigate(`/portemonnaies/${id}`);
        } catch (err) {
            setErreur(err.message);
            setSubmitting(false);
        }
    }

    if (erreur && !portemonnaie) return <div className="container mt-4"><div className="alert alert-danger">{erreur}</div></div>;
    if (!portemonnaie) return <p>Chargement...</p>;

    return (
        <div className="container mt-4">
            <div className="card p-4 bg-white">
                <h3 className="h3 mt-3">Nouvelle dépense — {portemonnaie.libelle}</h3>
                <hr className="hr"/>
                <Formik
                    initialValues={{libelle: '', montant: '', payeurId: compte.id}}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="libelle" className="form-label">Libellé</label>
                                <Field id="libelle" name="libelle" className="form-control bg-white"
                                       placeholder="ex: Restaurant, Train..."/>
                                <ErrorMessage name="libelle" component="div" className="text-danger small mt-1"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="montant" className="form-label">Montant (€)</label>
                                <Field id="montant" name="montant" type="number" step="0.01" min="0"
                                       className="form-control bg-white"/>
                                <ErrorMessage name="montant" component="div" className="text-danger small mt-1"/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="payeurId" className="form-label">Payé par</label>
                                <Field id="payeurId" name="payeurId" as="select" className="form-select bg-white">
                                    {portemonnaie.participants.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.id === compte.id ? `Moi (${p.prenom})` : p.prenom}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-4">
                                <button type="button" onClick={() => navigate(`/portemonnaies/${id}`)} className="btn btn-outline-secondary">Annuler</button>
                                <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary">Ajouter</button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {erreur && <p className="text-danger mt-3 mb-0">{erreur}</p>}
            </div>
        </div>
    );
}