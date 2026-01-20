import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
export const register = async (userData) => {
    try {
        const response = await axios.post(API_URL + '/addUtilisateur', userData);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        let errorMessage = "Erreur de connexion au serveur.";
        if (error.response) {
            errorMessage = error.response.data.message || "Erreur inconnue.";
        }
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(API_URL + '/loginUtilisateur', userData);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        let errorMessage = "Erreur de connexion.";
        if (error.response) {
            errorMessage = error.response.data.message || "Erreur inconnue.";
        }
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const getUserById = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, message: "Utilisateur non authentifié." };
    }
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        const response = await axios.get(API_URL + '/utilisateurById/' + userId, config);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        let errorMessage = "Erreur lors de la récupération de l'utilisateur.";
        if (error.response) {
            errorMessage = error.response.data.message || error.message;
        }
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, message: "Utilisateur non authentifié." };
    }
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        const response = await axios.get(API_URL + '/allUtilisateurs', config);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        let errorMessage = "Erreur lors de la récupération des utilisateurs.";
        if (error.response) {
            errorMessage = error.response.data.message || error.message;
        }
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const deleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, message: "Utilisateur non authentifié." };
    }
    try {
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        };
        const response = await axios.delete(`${API_URL}/deleteUtilisateur/${userId}`, config);
        return {
            success: true,
            message: response.data.message
        };
    } catch (error) {
        let errorMessage = "Erreur lors de la suppression.";
        if (error.response) {
            errorMessage = error.response.data.message || error.message;
        }
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const updateUser = async (userId, userData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, message: "Utilisateur non authentifié." };
    }
    try {
        const config = {
            headers: { Authorization: 'Bearer ' + token }
        };
        const response = await axios.put(API_URL + '/updateUtilisateur/' + userId, userData, config);
        return {
            success: true,
            message: response.data.message
        };
    } catch (error) {
        let errorMessage = "Erreur lors de la modification.";
        if (error.response) {
            errorMessage = error.response.data.message || error.message;
        }
        return {
            success: false,
            message: errorMessage
        };
    }
};
