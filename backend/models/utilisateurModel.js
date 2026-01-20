import connexion from "../config/bdd.js";

export const getUtilisateurByEmail = async (email) => {
    const query = `
        SELECT id, email, password, role 
        FROM users
        WHERE email = ?;
    `;
    const [response] = await connexion.query(query, [email]);
    return response;
};

export const addUtilisateur = async (nom, prenom, email, motDePasse) => {
    const query = `
        INSERT INTO users (nom, prenom, email, password)
        VALUES (?, ?, ?, ?);
    `;
    const [result] = await connexion.query(query, [nom, prenom, email, motDePasse]);
    return result;
};

export const getAllUtilisateurs = async () => {
    const query = `
        SELECT id, nom, prenom, email, role FROM users;
    `;
    const [response] = await connexion.query(query);
    return response;
};

export const getUtilisateurById = async (id) => {
    const query = `
        SELECT id, nom, prenom, email, role
        FROM users
        WHERE id = ?;
    `;
    const [response] = await connexion.query(query, [id]);
    return response;
};

export const updateUtilisateur = async (nom, prenom, email, motDePasse, id) => {
    const query = `
        UPDATE users
        SET nom = ?, prenom = ?, email = ?, password = ?
        WHERE id = ?;
    `;
    const [result] = await connexion.query(query, [nom, prenom, email, motDePasse, id]);
    return result;
};

export const deleteUtilisateur = async (id) => {
    const query = `
        DELETE FROM users
        WHERE id = ?;
    `;
    const [result] = await connexion.query(query, [id]);
    return result;
};
