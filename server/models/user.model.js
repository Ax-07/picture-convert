module.exports = (sequelize, DataTypes) => {
    // Création d'un modèle Sequelize
    const User = sequelize.define("user", {
        // La colonne "email" est de type STRING et ne peut pas être nulle. Elle représente l'adresse email de l'utilisateur.
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // La colonne "password" est de type STRING et ne peut pas être nulle. Elle représente le mot de passe de l'utilisateur.
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // La colonne "role" est de type STRING et a une valeur par défaut de "user". Elle représente le rôle de l'utilisateur.
        role: {
            type: DataTypes.STRING,
            defaultValue: "user"
        }
    }, {
        // L'option "timestamps" est définie sur false, donc Sequelize n'ajoutera pas les colonnes createdAt et updatedAt à la table.
        timestamps: false
    });
    // Le modèle "User" est retourné pour être utilisé dans d'autres parties de l'application.

    return User;

};