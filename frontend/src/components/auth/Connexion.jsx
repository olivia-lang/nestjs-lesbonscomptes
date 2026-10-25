import {useState} from "react";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, Navigate} from "react-router";
import {useAuth} from "../../auth/auth-context.js";

const schema = Yup.object({
    email: Yup.string()
        .email("L'email n'est pas valide")
        .required("L'email est obligatoire"),
    motDePasse: Yup.string()
        .required('Le mot de passe est obligatoire'),
});

export default function Connexion() {
    const { compte, seConnecter } = useAuth();
    const [erreur, setErreur] = useState(null);

    // redirecte vers la page d'accueil si déjà connecté
    if (compte) return <Navigate to="/" replace />;

    async function handleSubmit(values, { setSubmitting }) {
        setErreur(null);
        try {
            await seConnecter(values.email, values.motDePasse);
        } catch (err) {
            setErreur(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="container mt-4" style={{ maxWidth: 480 }}>
            <h1 className="h3 mb-3">Connexion</h1>

            <div className="card p-3 bg-white">
                <Formik
                    initialValues={{ email: '', motDePasse: '' }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field id="email" name="email" type="email" autoComplete="email" className="form-control bg-white" />
                                <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
                                <Field id="motDePasse" name="motDePasse" type="password" autoComplete="current-password" className="form-control bg-white" />
                                <ErrorMessage name="motDePasse" component="div" className="text-danger small mt-1" />
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">Se connecter</button>
                        </Form>
                    )}
                </Formik>

                {erreur && <div className="alert alert-danger mt-3 mb-0">{erreur}</div>}
            </div>

            <p className="mt-3 text-center">
                Pas encore de compte ? <Link to="/comptes/nouveau">Créer un compte</Link>
            </p>
        </div>
    );
}
