const express = require('express');
const app = express(); // Création d'une nouvelle application express
const cors = require('cors'); // Importation du module cors pour gerer les origines
require('dotenv').config(); // Importation du module dotenv pour charger les variables d'environnement

const corsOptions = {
  origin: process.env.URL_ORIGIN, // Remplacez par l'origine de votre client
  methods: ['GET', 'POST'], // Méthodes autorisées
  credentials: true // Autorise les cookies
};
app.use(cors(corsOptions)); // Configuration de l'application pour utiliser le module cors
app.use(express.json()); // Configuration de l'application pour utiliser le format JSON
app.use(express.urlencoded({ extended: true })); // Configuration de l'analyseur de corps de requête pour analyser les requêtes en format JSON

// Importation des routes
const convertPictureRoute = require('./routes/convertPicture.routes');
app.use('/api', convertPictureRoute); // Configuration de l'application pour utiliser les routes de convertPicture

// Swagger API documentation
const swaggerUi = require('swagger-ui-express'); // Importation du module swagger-ui-express
const yaml = require('yamljs'); // Importation du module yamljs
const swaggerDocs = yaml.load('swagger.yaml'); // Importation du fichier swagger.yaml
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Configuration de swagger-ui-express pour servir la documentation Swagger

// Gestion des routes non trouvées (404)
app.use((req, res, next) => {
  const err = new Error('Route non trouvée');
  err.status = 404;
  next(err);
});

app.use('/',(req, res) => {
  res.send('Welcome to the Pictures-convert API');
})
// Gestion des erreurs
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message || 'Erreur interne du serveur' });
});


const port = 8050; // Définition du port sur lequel le serveur sera lancé
// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    }
);