CREATE DATABASE IF NOT EXISTS gestion_utilisateurs;

USE gestion_utilisateurs;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
/* mot de passe : admin123 */
INSERT INTO users (nom, prenom, email, password, role) 
VALUES ('Admin', 'System', 'admin@test.com', '$2b$10$icAd8iN.5wwEAsLz9nzII.uPjgy8sC5vOQVqhhwjWqOH32utrgRAq', 'admin');

/* mot de passe : password123 */
INSERT INTO users (nom, prenom, email, password, role) 
VALUES ('Test', 'User', 'user@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user');
