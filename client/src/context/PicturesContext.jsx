import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { initPictureProperty } from "../utils/functions/blobUtils";

export const PictureContext = createContext();

export const PictureProvider = ({ children }) => {
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
  const [imgWidth, setImgWidth] = useState(0);

  const resetPictures = () => {
    setReponse(null);
    setImages(null);
    setQuality(80);
    setOriginalPictureProperty({ size: 0, width: 0, height: 0 });
    setComparedImageProperty({ size: 0, width: 0, height: 0 });
    setImgWidth(0);
  };

  useEffect(() => {
    if (images) {
      initPictureProperty(images, setOriginalPictureProperty);
    }},[images, setOriginalPictureProperty]);

  return (
    <PictureContext.Provider
      value={{
        reponse, setReponse,
        images, setImages,
        quality, setQuality,
        sizes, setSizes,
        originalPictureProperty, setOriginalPictureProperty,
        comparedImageProperty, setComparedImageProperty,
        imgWidth, setImgWidth,
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
