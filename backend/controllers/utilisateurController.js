import * as utilisateurModel from '../models/utilisateurModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const addUtilisateur = async (req, res) => {
    const { nom, prenom, email, motDePasse } = req.body;
    if (!nom || !prenom || !email || !motDePasse) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }
    if (motDePasse.length < 6) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères." });
    }
    try {
        const utilisateurExistant = await utilisateurModel.getUtilisateurByEmail(email);
        if (utilisateurExistant.length > 0) {
            return res.status(409).json({ message: "Cet email est déjà utilisé." });
        }
        const mdpHash = bcrypt.hashSync(motDePasse, 10);
        const result = await utilisateurModel.addUtilisateur(nom, prenom, email, mdpHash);
        res.status(201).json({
            message: "Utilisateur créé avec succès!",
            userId: result.insertId
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
    }
};

export const loginUtilisateur = async (req, res) => {
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }
    try {
        const utilisateurExistant = await utilisateurModel.getUtilisateurByEmail(email);
        if (utilisateurExistant.length === 0) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }
        const user = utilisateurExistant[0];
        const isMatch = await bcrypt.compare(motDePasse, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }
        const token = jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "Connexion réussie!",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ message: "Erreur serveur lors de la connexion." });
    }
};

export const getAllUtilisateurs = async (req, res) => {
    try {
        const utilisateurs = await utilisateurModel.getAllUtilisateurs();
        res.status(200).json(utilisateurs);
    } catch (error) {
        console.error("Erreur récupération utilisateurs:", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

export const getUtilisateurById = async (req, res) => {
    const id = req.params.id;
    try {
        const utilisateur = await utilisateurModel.getUtilisateurById(id);
        if (utilisateur.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        res.status(200).json(utilisateur);
    } catch (error) {
        console.error("Erreur récupération par ID:", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

export const updateUtilisateur = async (req, res) => {
    const { nom, prenom, motDePasse } = req.body;
    const idUtilisateur = req.params.id;
    if (!nom || !prenom || !motDePasse) {
        return res.status(400).json({ message: "Nom, prénom et mot de passe requis." });
    }
    try {
        const existant = await utilisateurModel.getUtilisateurById(idUtilisateur);
        if (existant.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        const emailExistant = existant[0].email;
        const mdpHash = bcrypt.hashSync(motDePasse, 10);
        await utilisateurModel.updateUtilisateur(nom, prenom, emailExistant, mdpHash, idUtilisateur);
        res.status(200).json({ message: "Utilisateur modifié avec succès." });
    } catch (error) {
        console.error("Erreur modification:", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

export const deleteUtilisateur = async (req, res) => {
    const idUtilisateur = req.params.id;
    try {
        const existant = await utilisateurModel.getUtilisateurById(idUtilisateur);
        if (existant.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        await utilisateurModel.deleteUtilisateur(idUtilisateur);
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error("Erreur suppression:", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};
