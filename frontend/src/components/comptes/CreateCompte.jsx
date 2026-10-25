import {useState} from "react";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {creerCompte} from "../../api/comptes.js";

// mêmes règles que le DTO côté back (CreateCompteDto)
const schema = Yup.object({
    prenom: Yup.string()
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne doit contenir que des lettres, espaces, tirets ou apostrophes')
        .required('Le prénom est obligatoire'),
    pseudo: Yup.string()
        .matches(/^[a-zA-Z0-9_.-]+$/, 'Lettres, chiffres, points, tirets ou underscores uniquement')
        .min(3, 'Au moins 3 caractères')
        .max(30, 'Au plus 30 caractères')
        .required('Le pseudo est obligatoire'),
    email: Yup.string()
        .email("L'email n'est pas valide")
        .required("L'email est obligatoire"),
    motDePasse: Yup.string()
        .min(8, 'Au moins 8 caractères')
        .required('Le mot de passe est obligatoire'),
    confirmation: Yup.string()
        .oneOf([Yup.ref('motDePasse')], 'Les mots de passe ne correspondent pas')
        .required('Merci de confirmer le mot de passe'),
});

const champs = [
    { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Marie' },
    { name: 'pseudo', label: 'Pseudo', type: 'text', placeholder: 'marie_d' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'marie@exemple.fr' },
    { name: 'motDePasse', label: 'Mot de passe', type: 'password' },
    { name: 'confirmation', label: 'Confirmer le mot de passe', type: 'password' },
];

export default function CreerCompte() {
    const [compteCree, setCompteCree] = useState(null);
    const [erreur, setErreur] = useState(null);

    async function handleSubmit({ confirmation: _, ...values }, { resetForm, setSubmitting }) {
        setErreur(null);
        try {
            const compte = await creerCompte(values);
            setCompteCree(compte);
            resetForm();
        } catch (err) {
            setErreur(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="h3 mb-3">Créer un compte</h1>

            <div className="card p-3 bg-white">
                <Formik
                    initialValues={{ prenom: '', pseudo: '', email: '', motDePasse: '', confirmation: '' }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {champs.map(({ name, label, type, placeholder }) => (
                                <div className="mb-3" key={name}>
                                    <label htmlFor={name} className="form-label">{label}</label>
                                    <Field id={name} name={name} type={type} placeholder={placeholder} className="form-control bg-white" />
                                    <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
                                </div>
                            ))}
                            <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-4">
                                <button type="reset" className="btn btn-outline-secondary">Annuler</button>
                                <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary col-3">Créer mon compte</button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {erreur && <div className="alert alert-danger mt-3">{erreur}</div>}
                {compteCree && (
                    <div className="alert alert-success mt-3">
                        Compte créé pour {compteCree.prenom} (@{compteCree.pseudo})
                    </div>
                )}
            </div>
        </div>
    )
}
