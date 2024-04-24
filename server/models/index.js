const dbConfig = require("./../config/db.config.js"); // Importation de la configuration de la base de données
const {Sequelize}  = require("sequelize"); // Importation de Sequelize, un ORM pour gérer la base de données SQL

const sequelize = new Sequelize('project6-db', 'user', 'pass', dbConfig);

const db = {}; // Création d'un objet vide pour stocker les modèles de la base de données

db.Sequelize = Sequelize; // Ajout de Sequelize à l'objet db
db.sequelize = sequelize; // Ajout de l'instance de Sequelize à l'objet db

db.user = require('./user.model.js')(sequelize, Sequelize); // Importation du modèle User et l'initialisation avec l'instance de Sequelize et Sequelize

module.exports = db; // Exportation de l'objet db pour être utilisé dans d'autres modules