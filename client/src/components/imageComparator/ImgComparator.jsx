import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

/**
 * 
 * @param {string} original - URL de l'image originale
 * @param {string} compared - URL de l'image à comparer
 * @param {number} imgWidth - Largeur de l'image
 * @param {function} setImgWidth - Fonction pour mettre à jour la largeur de l'image
 *  
 * @returns {JSX.Element} - Un élément JSX qui affiche un comparateur d'images
 */

export const ImgComparator = ({
  original,
  compared,
  imgWidth,
  setImgWidth,
}) => {
  const imgRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const slider = sliderRef.current;
    slider.style.left = imgWidth / 2 + "px";
    img.style.width = imgWidth / 2 + "px";

    const getCursorPosition = (e) => {
      const a = img.getBoundingClientRect();
      let x = e.clientX - a.left;
      return x;
    };

    const slide = (x) => {
      img.style.width = x + "px";
      slider.style.left = x + "px";
    };

    const slideMove = (e) => {
      let position = getCursorPosition(e);
      if (position < 0) position = 0;
      if (position > imgWidth) position = imgWidth;
      slide(position);
    };

    const slideReady = (e) => {
      e.preventDefault();
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    };

    const slideFinish = () => {
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
    };

    slider.addEventListener("mousedown", slideReady);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("mouseup", slideFinish);
    window.addEventListener("touchend", slideFinish);

    return () => {
      slider.removeEventListener("mousedown", slideReady);
      slider.removeEventListener("touchstart", slideReady);
      window.removeEventListener("mouseup", slideFinish);
      window.removeEventListener("touchend", slideFinish);
    };
  }, [imgWidth]);

  const onImageLoad = (e) => {
    setImgWidth(e.target.offsetWidth);
  };
  console.log("original", original);
  console.log("compared", compared);

  return (
    <div
      className="img-comparator"
      style={{ maxWidth: imgWidth }}
      data-testid="img-comparator"
    >
      <div className="img-comparator__img">
        <img
          src={original}
          alt="image original"
          onLoad={onImageLoad}
          data-testid="originalImg"
        />
      </div>
      <div
        ref={imgRef}
        className="img-comparator__img img-comparator__overlay"
        role="img-comp-overlay"
      >
        <img src={compared} alt="image compared" data-testid="comparedImg" />
      </div>
      <div
        ref={sliderRef}
        className="img-comparator__slider"
        role="slider"
      ></div>
    </div>
  );
};

ImgComparator.propTypes = {
  original: PropTypes.string.isRequired,
  compared: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  setImgWidth: PropTypes.func.isRequired,
};
