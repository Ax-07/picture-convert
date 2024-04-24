// Cette fonction est destinée à télécharger un fichier en réponse à une requête HTTP
module.exports.download = (req, res) => {
    // Récupération du format et du nom de l'image à télécharger à partir des paramètres de la requête
    const format = req.params.format;
    const imageName = req.params.imageName;

    // Affichage de quelques informations utiles pour le débogage
    console.log('format:', format);
    console.log('imageName:', imageName);

    // Recherche du fichier correspondant dans la liste des fichiers disponibles dans res.locals.files
    const file = res.locals.files.find(file => 
        file[format] && file[format].originalname === imageName
    );

    // Si le fichier est trouvé
    if (file) {
        // Configuration des en-têtes de la réponse HTTP pour spécifier le type de contenu et le nom de fichier
        res.set({
            'Content-Type': file[format].mimetype,
            'Content-Disposition': 'attachment; filename=' + file[format].originalname
        });
        // Envoi du contenu du fichier en réponse à la requête
        res.send(file[format].buffer);
    } else {
        // Si le fichier n'est pas trouvé, renvoi d'une réponse HTTP 404 (Non trouvé) avec un message d'erreur
        res.status(404).send({
            message: "Image non trouvée."
        });
    }
};
