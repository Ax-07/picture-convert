import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export const ImgComparator = ({ original, compared, imgWidth, setImgWidth }) => {
  const imgRef = useRef(null);
  const sliderRef = useRef(null);
  const img = imgRef.current;
  const slider = sliderRef.current;
  // const imgWidth = img?.offsetWidth; console.log("imgWidth : ", imgWidth);
  
  useEffect(() => {
    if (!img || !slider || imgWidth === null) return;
    img.style.width = imgWidth / 2 + "px";
    slider.style.left = imgWidth / 2 + "px";
    
    let clicked = 0;

    const slideReady = (e) => {
      e.preventDefault();
      clicked = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    };

    const slideFinish = () => {
      clicked = 0;
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
    };

    const slideMove = (e) => {
      if (clicked === 0) return false;
      let position = getCursorPosition(e);
      if (position < 0) position = 0;
      if (position > imgWidth) position = imgWidth;
      slide(position);
    };
    const getCursorPosition = (e) => {
      const a = img.getBoundingClientRect();
      let x = e.clientX - a.left;
      return x;
    };

    const slide = (x) => {
      img.style.width = x + "px";
      slider.style.left = x + "px";
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
  }, [img, imgWidth, slider]);

  const onImageLoad = (e) => {
    setImgWidth(e.target.offsetWidth);
  };

  return (
    <div className="img-comparator" style={{ maxWidth: imgWidth }}>
      <div className="img-comparator__img" >
        <img src={original} alt="image original" onLoad={onImageLoad} data-testid='originalImg'/>
      </div>
      <div ref={imgRef} className="img-comparator__img img-comparator__overlay" role="img-comp-overlay">
        <img src={compared} alt="image compared" data-testid='comparedImg' />
      </div>
      <div ref={sliderRef} className="img-comparator__slider" role="slider"></div>
    </div>
  );
};

ImgComparator.propTypes = {
  original: PropTypes.string.isRequired,
  compared: PropTypes.string.isRequired,
  imgWidth: PropTypes.number.isRequired,
  setImgWidth: PropTypes.func.isRequired,
};
