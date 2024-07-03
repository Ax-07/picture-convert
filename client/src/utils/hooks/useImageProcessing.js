import { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setCompressFormData, setMultiSizeFormData, setConvertFormData } from '../functions/setFormData';
import { multiSizePicture, compressPicture, convertPicture } from '../../api/convertPictureApi';
import { createBlobUrl, createDownloadUrls, initComparedImageProperty } from '../functions/blobUtils';
import { PictureContext } from '../../context/PicturesContext';

/**
 * @description - Un hook personnalisé pour gérer les requêtes API et creer les URLs de téléchargement des images.
 * @param {FileList} images - Les images à traiter.
 * @param {Number} quality - La qualité de l'image.
 * @param {Object} sizes - Les tailles des images.
 * @returns - Renvoie un objet contenant :
 *   response - La réponse de l'API.
 *   downloadUrl - L'URL de téléchargement de l'image traitée.
 *   downloadUrls - Les URL de téléchargement des images traitées (pour multi-size).
 *   isError - Un booléen indiquant si une erreur s'est produite lors de la requête.
 *   isLoading - Un booléen indiquant si la requête est en cours.
 *   onSubmit - Une fonction pour soumettre le formulaire et lancer le traitement de l'image.
 *   onReset - Une fonction pour réinitialiser tous les états.
 *   setIsError - Une fonction pour définir l'état isError.
 *   setIsLoading - Une fonction pour définir l'état isLoading.
 */

export const useImageProcessing = (images, quality, sizes) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const abortControllerRef = useRef(null);
    const [downloadUrls, setDownloadUrls] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const location = useLocation();
    const { setComparedImageProperty} = useContext(PictureContext);

    const onReset = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsLoading(false);
        setIsError(false);
        setResponse(null);
        setDownloadUrls(null);
        setDownloadUrl(null);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setIsLoading(true);
        abortControllerRef.current = new AbortController();
        console.log(location.pathname)
        try {
            let response, multiSizeForm, compressForm, convertForm;
            switch (location.pathname) {
                case '/application/multi-size':
                    multiSizeForm = setMultiSizeFormData(images, quality, sizes);
                    response = await multiSizePicture(multiSizeForm, abortControllerRef.current);
                    setResponse(response);
                    initComparedImageProperty(response.files[0].desktop, setComparedImageProperty);
                    setDownloadUrls(createDownloadUrls(response));
                    break;
                case '/application/compress':
                    compressForm = setCompressFormData(images, quality);
                    response = await compressPicture(compressForm, abortControllerRef.current);
                    setResponse(response);
                    initComparedImageProperty(response, setComparedImageProperty)
                    setDownloadUrl(createBlobUrl(response));
                    break;
                case '/application/convert':
                    convertForm = setConvertFormData(images);
                    response = await convertPicture(convertForm, abortControllerRef.current);
                    setResponse(response);
                    setDownloadUrl(createBlobUrl(response));
                    break;
                default:
                    console.log('Invalid path');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch cancelled');
            } else {
                setIsError(true);
                console.error('Error:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };
    // Annulation de la requete si le délai est écoulé
    useEffect(() => {
        let timer;
        if (isLoading) {
            timer = setTimeout(() => {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
                setIsError(true);
            }, 7000);
        }
        return () => clearTimeout(timer);
    }, [isLoading, setIsError]);

    return { response, downloadUrl, downloadUrls, isError, isLoading, onSubmit, onReset, setIsError, setIsLoading, setDownloadUrls };
};

useImageProcessing.propTypes = {
    images: PropTypes.instanceOf(FileList), // Les images doivent être une instance de FileList
    quality: PropTypes.number, // La qualité doit être un nombre
    sizes: PropTypes.object, // Les tailles doivent être un objet
};