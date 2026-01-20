// Page d'accueil
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const heroStyle = {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        minHeight: '100vh',
        color: '#fff',
        paddingTop: '80px'
    };

    return (
        <div style={heroStyle}>
            <div className="container text-center">
                <header className="py-5">
                    <h1 className="display-4 fw-bold mb-3">
                        Gestion Utilisateurs
                    </h1>
                    <p className="lead mb-4">
                        Application Full-Stack avec authentification JWT sécurisée
                    </p>
                </header>

                <section className="row justify-content-center">
                    <div className="col-lg-8 mb-4">
                        <div className="card shadow-lg p-4" style={{ background: 'rgba(255,255,255,0.95)' }}>
                            <h2 className="h4 mb-3 text-dark">Description du Projet</h2>
                            <p className="text-start text-secondary">
                                Ce projet démontre la mise en œuvre d'une <strong>API RESTful sécurisée</strong> (Node.js + Express)
                                avec architecture MVC, utilisant le <strong>Token JWT</strong> pour l'autorisation basée sur
                                les rôles (Admin vs Utilisateur standard) et un frontend <strong>React</strong> pour l'interaction utilisateur.
                            </p>
                            <hr />
                            <div className="row text-center">
                                <div className="col-md-4 mb-3">
                                    <div className="p-3 bg-primary bg-opacity-10 rounded">
                                        <h5 className="text-primary">JWT Auth</h5>
                                        <small className="text-muted">Authentification sécurisée</small>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="p-3 bg-success bg-opacity-10 rounded">
                                        <h5 className="text-success">MySQL</h5>
                                        <small className="text-muted">Base de données</small>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="p-3 bg-info bg-opacity-10 rounded">
                                        <h5 className="text-info">React</h5>
                                        <small className="text-muted">Frontend moderne</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-4">
                    <h2 className="h5 mb-4">Commencez Ici</h2>
                    <button
                        className="btn btn-light btn-lg me-3 shadow"
                        onClick={() => navigate('/login')}
                    >
                        Se Connecter
                    </button>
                    <button
                        className="btn btn-outline-light btn-lg shadow"
                        onClick={() => navigate('/register')}
                    >
                        S'inscrire
                    </button>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
