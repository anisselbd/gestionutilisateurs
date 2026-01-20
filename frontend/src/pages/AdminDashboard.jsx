import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../services/utilisateurService';

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');

        if (!token || userRole !== 'admin') {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsers();

            if (response.success) {
                setUsers(response.data);
                setError(null);
            } else {
                setError(response.message);
            }
            setLoading(false);
        };

        if (localStorage.getItem('userRole') === 'admin') {
            fetchUsers();
        } else {
            setLoading(false);
        }
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            return;
        }

        const response = await deleteUser(userId);

        if (response.success) {
            setUsers(users.filter(user => user.id !== userId));
            alert("Utilisateur supprimé avec succès !");
        } else {
            setError(response.message);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg border-0">
                <div className="card-header bg-danger text-white py-3 d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Dashboard Administrateur</h4>
                    <span className="badge bg-light text-dark">
                        {users.length} utilisateur(s)
                    </span>
                </div>
                <div className="card-body p-4">
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}

                    {users.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Email</th>
                                        <th>Rôle</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td><span className="badge bg-secondary">{user.id}</span></td>
                                            <td>{user.nom}</td>
                                            <td>{user.prenom}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => navigate('/admin/edit/' + user.id)}
                                                >
                                                    ✏️ Modifier
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    🗑️ Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            Aucun utilisateur trouvé.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
