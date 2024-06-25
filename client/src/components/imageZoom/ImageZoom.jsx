import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ImageZoom = ({ imgSrc, resultID, className }) => {
  const imgRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const lens = lensRef.current;

    const cx = img.width / lens.offsetWidth;
    const cy = img.height / lens.offsetHeight;

    lens.style.backgroundImage = `url('${imgSrc}')`;
    lens.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

    const moveLens = (e) => {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x - (lens.offsetWidth / 2);
      let y = pos.y - (lens.offsetHeight / 2);

      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      lens.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };

    const getCursorPos = (e) => {
      const a = img.getBoundingClientRect();
      const x = e.pageX - a.left - window.scrollX;
      const y = e.pageY - a.top - window.scrollY;
      return { x, y };
    };

    lens.addEventListener('mousemove', moveLens);
    img.addEventListener('mousemove', moveLens);
    lens.addEventListener('touchmove', moveLens);
    img.addEventListener('touchmove', moveLens);

    return () => {
      lens.removeEventListener('mousemove', moveLens);
      img.removeEventListener('mousemove', moveLens);
      lens.removeEventListener('touchmove', moveLens);
      img.removeEventListener('touchmove', moveLens);
    };
  }, [imgSrc]);

  return (
    <div style={{ position: 'relative', display: 'inline-block', width:"600px", height:"100%" }}>
      <img ref={imgRef} src={imgSrc} alt="Zoom" style={{width: "600px", height:"100%"}}/>
      <div
        ref={lensRef}
        style={{
          position: 'absolute',
          zIndex: 100,
          border: '1px solid #d4d4d4',
          borderRadius: '50%',
          width: '100px',  // Change width as needed
          height: '100px', // Change height as needed
          pointerEvents: 'none',
          backgroundRepeat: 'no-repeat',
          opacity: 1, // Slight transparency to see the underlying image
        }}
        className="img-zoom-lens"
      ></div>
    </div>
  );
};

ImageZoom.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  resultID: PropTypes.string.isRequired,
};
