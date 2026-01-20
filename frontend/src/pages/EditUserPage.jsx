import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser } from '../services/utilisateurService';

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('Enregistrement en cours...');

        try {
            const response = await updateUser(id, formData);

            if (response.success) {
                setMessage("Utilisateur modifié avec succès !");
                setTimeout(() => {
                    navigate(-1);
                }, 1500);
            } else {
                setMessage("Erreur: " + response.message);
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
            setMessage('Erreur: Impossible de se connecter au serveur.');
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUserById(id);

            if (response.success && response.data.length > 0) {
                const userData = response.data[0];
                setFormData({
                    nom: userData.nom || '',
                    prenom: userData.prenom || '',
                    email: userData.email || '',
                    motDePasse: ''
                });
                setLoading(false);
            } else {
                setError(response.message || "Utilisateur non trouvé.");
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    ← Retour
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-warning text-dark py-3">
                            <h4 className="mb-0">✏️ Modifier Utilisateur #{id}</h4>
                        </div>
                        <div className="card-body p-4">
                            {message && (
                                <div className={`alert ${message.includes('Erreur') ? 'alert-danger' : 'alert-success'}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nom" className="form-label">Nom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="prenom" className="form-label">Prénom</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="prenom"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email <small className="text-muted">(lecture seule)</small>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="motDePasse" className="form-label">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="motDePasse"
                                        name="motDePasse"
                                        value={formData.motDePasse}
                                        onChange={handleChange}
                                        placeholder="Laisser vide pour ne pas changer"
                                        required
                                    />
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-warning flex-grow-1"
                                        disabled={saving}
                                    >
                                        {saving ? 'Enregistrement...' : '💾 Enregistrer'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
