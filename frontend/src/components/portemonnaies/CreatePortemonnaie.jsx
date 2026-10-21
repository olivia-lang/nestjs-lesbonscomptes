import {useState} from "react";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "../../shared/Button.jsx";
import {creerPortemonnaie} from "../../api/porte-monnaies.js";

// à supprimer dès qu'on a l'auth
const COMPTE_ID_SIMULE = 1;

const schema = Yup.object({
    libelle: Yup.string()
        .required('Le nom est obligatoire'),
});

export default function CreerPortemonnaie() {
    const [portemonnaieCree, setPortemonnaieCree] = useState(null);
    const [erreur, setErreur] = useState(null);

    async function handleSubmit(values, { resetForm, setSubmitting }) {
        setErreur(null);
        try {
            const portemonnaie = await creerPortemonnaie(values.libelle, COMPTE_ID_SIMULE);
            setPortemonnaieCree(portemonnaie);
            resetForm();
        } catch (err) {
            setErreur(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <div>
                <h1>Créer un porte-monnaie</h1>
                <Formik
                    initialValues={{ libelle: '' }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field name="libelle" placeholder="Nom du porte-monnaie" />
                            <ErrorMessage name="libelle" component="p" style={{ color: 'red' }} />
                            <Button type="submit" disabled={isSubmitting}>Créer</Button>
                        </Form>
                    )}
                </Formik>

                {erreur && <p style={{ color: 'red' }}>{erreur}</p>}
                {portemonnaieCree && (
                    <p>Porte-monnaie "{portemonnaieCree.libelle}" créé (id {portemonnaieCree.id})</p>
                )}
            </div>
        </>
    )
}