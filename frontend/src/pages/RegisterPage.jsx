import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/utilisateurService';

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Inscription en cours...');

        try {
            const response = await register(formData);

            if (response.success) {
                setFormData({ nom: '', prenom: '', email: '', motDePasse: '' });
                setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage('Erreur: ' + response.message);
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
            setMessage('Erreur: Impossible de se connecter au serveur.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-success text-white text-center py-3">
                            <h4 className="mb-0">Inscription</h4>
                        </div>
                        <div className="card-body p-4">
                            {message && (
                                <div className={`alert ${message.includes('Erreur') ? 'alert-danger' : 'alert-success'}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nom" className="form-label">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nom"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            placeholder="Dupont"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="prenom" className="form-label">Prénom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="prenom"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleChange}
                                            placeholder="Jean"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="votre@email.com"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="motDePasse"
                                        name="motDePasse"
                                        value={formData.motDePasse}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Inscription...' : "S'inscrire"}
                                </button>
                            </form>

                            <hr className="my-4" />
                            <p className="text-center text-muted mb-0">
                                Déjà inscrit ?{' '}
                                <a href="/login" className="text-success">Se connecter</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
