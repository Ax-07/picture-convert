import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { initPictureProperty } from "../utils/functions/blobUtils";

export const PictureContext = createContext();

/**
 * @description - Un context React qui fournit les états et fonctions pour gérer les images.
 * @param {Object} children - Les composants enfants.
 * 
 * @returns - Un context React qui fournit les états et fonctions pour gérer les contenant :
 *  isDisplayPreviewPicture - Un booléen indiquant si la prévisualisation de l'image est affichée.
 *  setIsDisplayPreviewPicture - Une fonction pour définir l'état isDisplayPreviewPicture.
 *  previewPicture - L'image à prévisualiser.
 *  setPreviewPicture - Une fonction pour définir l'image à prévisualiser.
 *  reponse - La réponse de l'API.
 *  setReponse - Une fonction pour définir la réponse de l'API.
 *  images - Les images à traiter.
 *  setImages - Une fonction pour définir les images à traiter.
 *  quality - La qualité de l'image.
 *  setQuality - Une fonction pour définir la qualité de l'image.
 *  sizes - Les tailles des images.
 *  setSizes - Une fonction pour définir les tailles des images.
 *  originalPictureProperty - Les propriétés de l'image originale.
 *  setOriginalPictureProperty - Une fonction pour définir les propriétés de l'image originale.
 *  comparedImageProperty - Les propriétés de l'image à comparer.
 *  setComparedImageProperty - Une fonction pour définir les propriétés de l'image à comparer.
 *  resetPictures - Une fonction pour réinitialiser tous les états.
 * 
 */

export const PictureProvider = ({ children }) => {
  const [isDisplayPreviewPicture, setIsDisplayPreviewPicture] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [reponse, setReponse] = useState();
  const [images, setImages] = useState(null);
  const [quality, setQuality] = useState(80);
  const [sizes, setSizes] = useState({
    mobile: 430,
    tablet: 768,
    desktop: 1024,
  });
  const [originalPictureProperty, setOriginalPictureProperty] = useState({
    size: 0,
    width: 0,
    height: 0,
  });
  const [comparedImageProperty, setComparedImageProperty] = useState({
    size: 0,
    width: 0,
    height: 0,
  });

  const resetPictures = () => {
    setPreviewPicture(null);
    setIsDisplayPreviewPicture(false);
    setReponse(null);
    setImages(null);
    setQuality(80);
    setOriginalPictureProperty({ size: 0, width: 0, height: 0 });
    setComparedImageProperty({ size: 0, width: 0, height: 0 });
  };

  useEffect(() => {
    if (images) {
      initPictureProperty(images, setOriginalPictureProperty);
    }},[images, setOriginalPictureProperty]);

  return (
    <PictureContext.Provider
      value={{
        isDisplayPreviewPicture, setIsDisplayPreviewPicture,
        previewPicture, setPreviewPicture,
        reponse, setReponse,
        images, setImages,
        quality, setQuality,
        sizes, setSizes,
        originalPictureProperty, setOriginalPictureProperty,
        comparedImageProperty, setComparedImageProperty,
        resetPictures,
      }}
    >
      {children}
    </PictureContext.Provider>
  );
};

PictureProvider.propTypes = {
  children: PropTypes.node,
};
