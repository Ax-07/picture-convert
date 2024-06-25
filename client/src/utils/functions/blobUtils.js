/**
 * @description Crée une URL de blob à partir de données d'image.
 * @param {object} imageData - Les données de l'image.
 * @returns L'URL de l'objet blob créée pour l'image.
 */
export const createBlobUrl = (imageData) => {
    console.log("imageData", imageData)
    const blob = new Blob([new Uint8Array(imageData.buffer.data)], { type: "image/webp" });
    const url = window.URL.createObjectURL(blob);
    return url;
};

/**
 * @description Crée des URLs de téléchargement pour les images compressées.
 * @param {Array} response - Réponse de l'API contenant les données des images compressées. 
 * @returns Objet contenant les URLs de téléchargement et les noms de fichiers des images compressées pour mobile, tablette et bureau.
 */
export const createDownloadUrls = (response) => {
    console.log("response", response)
    const downloadUrls = {
        mobile: { url: "", name: "" },
        tablet: { url: "", name: "" },
        desktop: { url: "", name: "" },
    };

    response.files?.forEach((res) => {
        if (res.mobile && res.tablet && res.desktop) {
        downloadUrls.mobile.url = createBlobUrl(res.mobile);
        downloadUrls.mobile.name = res.mobile.originalname;
        downloadUrls.tablet.url = createBlobUrl(res.tablet);
        downloadUrls.tablet.name = res.tablet.originalname;
        downloadUrls.desktop.url = createBlobUrl(res.desktop);
        downloadUrls.desktop.name = res.desktop.originalname;
        }
    });

    return downloadUrls;
};

/**
 * @description Initialise les propriétés (size, width, height) de l'image.
 * @param {FileList} image - Image à initialiser
 * @param {function} setProperty - Fonction pour mettre à jour l'état des propriétés de l'image
 */
export const initPictureProperty = (image, setProperty) => {
    console.log("image", image)
    const img = new Image();
    img.src = URL.createObjectURL(image);
    img.onload = function () {
        setProperty({
            size: image.size,
            width: this.width,
            height: this.height,
        });
    };
    return () => {
        URL.revokeObjectURL(img.src);
    };
};

/**
 * @description Initialise les propriétés (size, width, height) de l'image à comparer.
 * @param {object} imageData - Les données de l'image à comparer
 * @param {function} setProperty - Fonction pour mettre à jour l'état des propriétés de l'image à comparer.
 */
export const initComparedImageProperty = (imageData, setProperty) => {
    const blob = new Blob([new Uint8Array(imageData.buffer.data)], { type: "image/webp" });
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = function () {
        setProperty({
            size: blob.size,
            width: this.width,
            height: this.height,
        });
    };
    return () => {
        URL.revokeObjectURL(img.src);
    };
};