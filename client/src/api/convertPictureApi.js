const serverHost = `${import.meta.env.VITE_REACT_APP_API_URL}`;

/**
 * Envoie une requête POST pour compresser une image.
 * @param {FormData} form_data - Les données du formulaire à envoyer.
 * @returns {Promise<Object>} - La réponse JSON du serveur.
 * @throws {Error} - Si une erreur survient lors de la requête ou si le serveur répond avec un statut non-ok.
 */

export const convertPicture = async (form_data) => {
    try {
        const response = await fetch(`${serverHost}/api/convert`, {
            method: 'POST',
            body: form_data,
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la conversion de l\'image');
        }
        return response.json();
    } catch (error) {
        throw new Error('Erreur lors de la conversion de l\'image');
    }
};

/**
 * Envoie une requête POST pour compresser une image.
 * @param {FormData} form_data - Les données du formulaire à envoyer.
 * @returns {Promise<Object>} - La réponse JSON du serveur.
 * @throws {Error} - Si une erreur survient lors de la requête ou si le serveur répond avec un statut non-ok.
 */

export const compressPicture = async (form_data) => {
    try {
        const response = await fetch(`${serverHost}/api/compress`, {
            method: 'POST',
            body: form_data,
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la compression de l\'image');
        }
        return response.json();
    } catch (error) {
        throw new Error('Erreur lors de la compression de l\'image');
    }
}

/**
 * Envoie une requête POST pour créer des images de différentes tailles.
 * @param {FormData} form_data - Les données du formulaire à envoyer.
 * @returns {Promise<Object>} - La réponse JSON du serveur.
 * @throws {Error} - Si une erreur survient lors de la requête ou si le serveur répond avec un statut non-ok.
 */
export const multiSizePicture = async (form_data) => {
    try {
        const response = await fetch(`${serverHost}/api/multi-size`, {
            method: 'POST',
            body: form_data,
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la création des images: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Erreur lors de la création des images: ${error.message}`);
    }
}

export const downloadZip = async () => {
    try {
        const response = await fetch(`${serverHost}/api/download/zip`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Erreur lors du téléchargement du fichier: ${response.statusText}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'images.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(`Erreur lors du téléchargement du fichier: ${error.message}`);
    }
};