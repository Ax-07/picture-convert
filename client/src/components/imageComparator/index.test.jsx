import { test, expect, vi, describe } from 'vitest';
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { ImgComparator } from './ImgComparator';

test('renders ImgComparator component', () => {
    const setImgWidth = vi.fn();
    const { getByAltText, getByRole } = render(
      <ImgComparator
        original="original.png"
        compared="compared.png"
        imgWidth={500}
        setImgWidth={setImgWidth}
      />
    );
  
    
    // Vérifie que les images sont rendues
    const originalImg = getByAltText('image original');
    expect(originalImg).toBeInTheDocument();
    const overlay = getByRole('img-comp-overlay');
    expect(overlay).toBeInTheDocument();
    const comparedImg = getByAltText('image compared');
    expect(comparedImg).toBeInTheDocument();
    
    // Vérifie que le slider est rendu
    const slider = getByRole('slider');
    expect(slider).toBeInTheDocument();
});

test('slideMove is called when the slider is moved', () => {
  let imgWidth = 0;
  const setImgWidth = vi.fn();
  const { getByRole } = render(
    <ImgComparator
    original="original.png"
    compared="compared.png"
    imgWidth={imgWidth}
    setImgWidth={setImgWidth}
    />
  );
  
  setImgWidth(imgWidth = 1000);

  const slider = getByRole('slider');
  slider.style.left = imgWidth / 2 + "px";
  const overlay = getByRole('img-comp-overlay');
  overlay.style.width = imgWidth / 2 + "px";

  // Vérifie que la largeur de l'image a changé
  expect(setImgWidth).toHaveBeenCalledWith(1000);
  // Vérifie que la position du slider a changé
  expect(slider.style.left).toBe('500px');
  // Vérifie que la largeur de l'overlay a changé
  expect(overlay.style.width).toBe('500px');
  
  // Simule le déplacement du slider
  fireEvent.mouseDown(slider);
  fireEvent.mouseMove(window, { clientX: 250 });
  fireEvent.mouseUp(window);

  // // Vérifie que la position du slider a changé
  // expect(slider.style.left).toBe('250px');
  // // Vérifie que la largeur de l'overlay a changé
  // expect(overlay.style.width).toBe('250px');
});

// describe('ImgComparator', () => {
//   const original = 'original.png';
//   const compared = 'compared.png';
//   const imgWidth = 500;
//   const setImgWidth = vi.fn();

//   test('renders correctly', () => {
//     const { getByRole, getByTestId } = render(
//       <ImgComparator
//         original={original}
//         compared={compared}
//         imgWidth={imgWidth}
//         setImgWidth={setImgWidth}
//       />
//     );

//     expect(getByTestId('originalImg')).toHaveAttribute('src', original);
//     expect(getByTestId('comparedImg')).toHaveAttribute('src', compared);
//     expect(getByRole('slider')).toBeInTheDocument();
//   });

//   test('calls setImgWidth on image load', () => {
//     const { getByTestId } = render(
//       <ImgComparator
//         original={original}
//         compared={compared}
//         imgWidth={imgWidth}
//         setImgWidth={setImgWidth}
//       />
//     );

//     fireEvent.load(getByTestId('originalImg'));

//     expect(setImgWidth).toHaveBeenCalled();
//   });

//   test('handles slider movement', () => {
//     const { getByRole, getByTestId } = render(
//       <ImgComparator
//         original={original}
//         compared={compared}
//         imgWidth={imgWidth}
//         setImgWidth={setImgWidth}
//       />
//     );
  
//     const slider = getByRole('slider');
//     const img = getByTestId('comparedImg');
  
//     // Simule le déplacement de la souris à une position à l'intérieur des limites de l'image
//     fireEvent.mouseDown(slider);
//     fireEvent.mouseMove(window, { clientX: imgWidth / 2 });
//     fireEvent.mouseUp(window);
  
//     // Vérifie que le style left du slider et la largeur de l'image sont mis à jour correctement
//     expect(img.style.width).toBe(`${imgWidth / 2}px`);
//     expect(slider.style.left).toBe(`${imgWidth / 2}px`);
  
//     // Simule le déplacement de la souris à une position en dehors des limites de l'image
//     fireEvent.mouseDown(slider);
//     fireEvent.mouseMove(window, { clientX: imgWidth + 100 });
//     fireEvent.mouseUp(window);
  
//     // Vérifie que le style left du slider et la largeur de l'image ne dépassent pas les limites de l'image
//     expect(img.style.width).toBe(`${imgWidth}px`);
//     expect(slider.style.left).toBe(`${imgWidth}px`);
//   });

//   test('handles slider movement outside image boundaries', () => {
//     const { getByRole, getByTestId } = render(
//       <ImgComparator
//         original={original}
//         compared={compared}
//         imgWidth={imgWidth}
//         setImgWidth={setImgWidth}
//       />
//     );
  
//     const slider = getByRole('slider');
//     const img = getByTestId('comparedImg');
  
//     // Simule le déplacement de la souris à une position en dehors des limites de l'image
//     fireEvent.mouseDown(slider);
//     fireEvent.mouseMove(window, (e)=>{e.clientX = -100});
//     fireEvent.mouseUp(window);
  
//     // Vérifie que le style left du slider et la largeur de l'image ne dépassent pas les limites de l'image
//     expect(img.style.width).toBe('0px');
//     expect(slider.style.left).toBe('0px');
  
//     // // Simule le déplacement de la souris à une position en dehors des limites de l'image
//     // fireEvent.mouseDown(slider);
//     // fireEvent.mouseUp(window);
  
//     // // Vérifie que le style left du slider et la largeur de l'image ne dépassent pas les limites de l'image
//     // expect(img.style.width).toBe(`${imgWidth}px`);
//     // expect(slider.style.left).toBe(`${imgWidth}px`);
//   });
// });