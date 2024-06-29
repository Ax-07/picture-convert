import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

/**
 *
 * @param {string} original - URL de l'image originale
 * @param {string} compared - URL de l'image à comparer
 *
 * @returns {JSX.Element} - Un élément JSX qui affiche un comparateur d'images
 */

export const ImgComparator = ({ original, compared }) => {
  const comparatorRef = useRef(null);
  const overlayRef = useRef(null);
  const sliderRef = useRef(null);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const comparator = comparatorRef.current;
    const overlay = overlayRef.current;
    const slider = sliderRef.current;

    if (!comparator || !overlay || !slider) return;

    const getCursorPosition = (e) => {
      const rect = comparator.getBoundingClientRect();
      let x = e.clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      return x;
    };

    const slide = (x) => {
      overlay.style.width = `${x}px`;
      slider.style.left = `${x}px`;
    };

    const startSlide = (e) => {
      setIsSliding(true);
      slide(getCursorPosition(e));
    };

    const stopSlide = () => {
      setIsSliding(false);
    };

    const moveSlide = (e) => {
      if (isSliding) {
        slide(getCursorPosition(e));
      }
    };

    slider.addEventListener("mousedown", startSlide);
    window.addEventListener("mouseup", stopSlide);
    window.addEventListener("mousemove", moveSlide);

    slider.addEventListener("touchstart", (e) => startSlide(e.touches[0]));
    window.addEventListener("touchend", stopSlide);
    window.addEventListener("touchmove", (e) => moveSlide(e.touches[0]));

    return () => {
      slider.removeEventListener("mousedown", startSlide);
      window.removeEventListener("mouseup", stopSlide);
      window.removeEventListener("mousemove", moveSlide);
      slider.removeEventListener("touchstart", (e) => startSlide(e.touches[0]));
      window.removeEventListener("touchend", stopSlide);
      window.removeEventListener("touchmove", (e) => moveSlide(e.touches[0]));
    };
  }, [isSliding]);

  return (
    <div
      className="image-comparator damier-background"
      data-testid="image-comparator"
      ref={comparatorRef}
    >
      <div className="image-comparator__wrapper">
         <img
          src={original}
          alt="Original Image"
          className="image-comparator__image image-comparator__image--original"
          data-testid="original-image"
        /> 
        <div
          className="image-comparator__overlay"
          data-testid="image-comparator-overlay"
          ref={overlayRef}
        >
          <img
            src={compared}
            alt="Compared Image"
            className="image-comparator__image image-comparator__image--compared"
            data-testid="compared-image"
          /> 
        </div>
        <div 
          className="image-comparator__slider"
          data-testid="image-comparator-slider"
          ref={sliderRef}
        ></div>
      </div>
    </div>
  );
};

ImgComparator.propTypes = {
  original: PropTypes.string.isRequired,
  compared: PropTypes.string.isRequired,
};
