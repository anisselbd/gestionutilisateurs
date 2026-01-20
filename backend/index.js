import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connexion from './config/bdd.js';
import utilisateurRoutes from './routes/utilisateurRoute.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'API fonctionne!' });
});
app.use('/api', utilisateurRoutes);
app.use((req, res) => {
    console.log(`Route non trouvée: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route ${req.method} ${req.url} non trouvée` });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
