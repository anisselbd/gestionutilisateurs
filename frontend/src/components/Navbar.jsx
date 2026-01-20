import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/', { replace: true });
    };

    const isAuthenticated = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => navigate('/')}>
                    <i className="fas fa-user-shield me-2"></i>Gestion Utilisateurs
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/dashboard')}>
                                        Mon Profil
                                    </a>
                                </li>

                                {userRole === 'admin' && (
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => navigate('/admin')}>
                                            Dashboard Admin
                                        </a>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/login')}>
                                        Connexion
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate('/register')}>
                                        Inscription
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
