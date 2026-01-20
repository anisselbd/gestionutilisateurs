import * as utilisateurController from '../controllers/utilisateurController.js';
import express from "express";
import { checkAuth, checkAdmin } from '../middlewares/Middleware.js';

const router = express.Router();

router.post('/addUtilisateur', utilisateurController.addUtilisateur);
router.post('/loginUtilisateur', utilisateurController.loginUtilisateur);
router.get('/allUtilisateurs', checkAuth, utilisateurController.getAllUtilisateurs);
router.get('/utilisateurById/:id', checkAuth, utilisateurController.getUtilisateurById);
router.put('/updateUtilisateur/:id', checkAuth, utilisateurController.updateUtilisateur);
router.delete('/deleteUtilisateur/:id', [checkAuth, checkAdmin], utilisateurController.deleteUtilisateur);

export default router;
