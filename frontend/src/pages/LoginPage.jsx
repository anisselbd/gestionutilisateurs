import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/utilisateurService";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        motDePasse: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        setMessage('Connexion en cours...');

        try {
            const response = await login(formData);
            if (response.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userRole', response.data.user.role);
                localStorage.setItem('userId', response.data.user.id);

                if (response.data.user.role === 'admin') {
                    navigate('/admin', { replace: true });
                } else {
                    navigate('/dashboard', { replace: true });
                }
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
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h4 className="mb-0">Connexion</h4>
                        </div>
                        <div className="card-body p-4">
                            {message && (
                                <div className={`alert ${message.includes('Erreur') ? 'alert-danger' : 'alert-info'}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
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
                                        className="form-control form-control-lg"
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
                                    className="btn btn-primary btn-lg w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Connexion...' : 'Se Connecter'}
                                </button>
                            </form>

                            <hr className="my-4" />
                            <p className="text-center text-muted mb-0">
                                Pas encore inscrit ?{' '}
                                <a href="/register" className="text-primary">Créer un compte</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
