import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../services/utilisateurService";

const UserDashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');
    const loggedInUserId = localStorage.getItem('userId');

    useEffect(() => {
        if (!token || !loggedInUserId) {
            navigate('/login', { replace: true });
        }
    }, [navigate, token, loggedInUserId]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserById(loggedInUserId);

            if (response.success && response.data.length > 0) {
                setUser(response.data[0]);
                setError(null);
            } else {
                setError(response.message || "Impossible de charger le profil.");
            }
            setLoading(false);
        };

        if (loggedInUserId) {
            fetchUser();
        }
    }, [loggedInUserId]);

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
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-info text-white py-3">
                            <h4 className="mb-0">Mon Profil</h4>
                        </div>
                        <div className="card-body p-4">
                            <div className="row align-items-center mb-4">
                                <div className="col-auto">
                                    <div className="bg-primary bg-opacity-10 rounded-circle p-4">
                                        <span className="display-4"></span>
                                    </div>
                                </div>
                                <div className="col">
                                    <h3 className="mb-1">{user?.prenom} {user?.nom}</h3>
                                    <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                                        {user?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                                    </span>
                                </div>
                            </div>

                            <hr />

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="text-muted small">Nom</label>
                                    <p className="fw-bold mb-0">{user?.nom}</p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="text-muted small">Prénom</label>
                                    <p className="fw-bold mb-0">{user?.prenom}</p>
                                </div>
                                <div className="col-12 mb-3">
                                    <label className="text-muted small">Email</label>
                                    <p className="fw-bold mb-0">{user?.email}</p>
                                </div>
                            </div>

                            <hr />

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-warning"
                                    onClick={() => navigate('/admin/edit/' + user?.id)}
                                >
                                    ✏️ Modifier mon compte
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
