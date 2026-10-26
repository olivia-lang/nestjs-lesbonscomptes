import {useState} from "react";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router";
import {creerPortemonnaie} from "../../api/porte-monnaies.js";
import {useAuth} from "../../auth/auth-context.js";

const schema = Yup.object({
    libelle: Yup.string()
        .required('Le nom est obligatoire'),
});

export default function CreerPortemonnaie() {
    const [portemonnaieCree, setPortemonnaieCree] = useState(null);
    const [erreur, setErreur] = useState(null);
    const navigate = useNavigate();
    const { refreshPortemonnaies } = useAuth();

    async function handleSubmit(values, { resetForm, setSubmitting }) {
        setErreur(null);
        try {
            const portemonnaie = await creerPortemonnaie(values.libelle);
            setPortemonnaieCree(portemonnaie);
            await refreshPortemonnaies();
            resetForm();
        } catch (err) {
            setErreur(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div className="container mt-4">
                <h3 className="h3 mb-3">Nouveau porte-monnaie</h3>

                <div className="card p-3 bg-white">
                    <Formik
                        initialValues={{ libelle: '' }}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="mt-4">
                                <div className="mb-3">
                                    <label htmlFor="libelle" className="form-label">Nom du porte-monnaie</label>
                                    <Field name="libelle" placeholder="Vacances à Paris" className="form-control col-3 bg-white" />
                                </div>
                                <ErrorMessage name="libelle" component="p" style={{ color: 'red' }} />
                                <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-4">
                                    <button type="button" onClick={() => navigate('/portemonnaies')} className="btn btn-outline-secondary">Annuler</button>
                                    <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary col-3">Créer</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
                    {portemonnaieCree && (
                        <p>Porte-monnaie "{portemonnaieCree.libelle}" créé (id {portemonnaieCree.id})</p>
                    )}
                </div>
            </div>
        </>
    )
}