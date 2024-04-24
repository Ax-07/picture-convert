const serverHost = 'http://localhost:8050';

export const convertPicture = async (form_data) => {
    try {
        const response = await fetch(`${serverHost}/api/convert`, {
            method: 'POST',
            body: form_data,
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur lors de la conversion de l\'image');
        }
    } catch (error) {
        throw new Error('Erreur lors de la conversion de l\'image');
    }
};

export const compressPicture = async (form_data) => {
    try {
        const response = await fetch(`${serverHost}/api/compress`, {
            method: 'POST',
            body: form_data,
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur lors de la compression de l\'image');
        }
    } catch (error) {
        throw new Error('Erreur lors de la compression de l\'image');
    }
}

export const multiSizePicture = async (form_data) => {
    try {
        const response = await fetch(`${serverHost}/api/multi-size`, {
            method: 'POST',
            body: form_data,
        });
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur lors de la création des images');
        }
    } catch (error) {
        throw new Error('Erreur lors de la création des images');
    }
}