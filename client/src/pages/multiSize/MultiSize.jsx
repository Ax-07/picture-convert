import { useContext } from "react";
import { AddPicture } from "../../components/addPicture/AddPicture";
import { ImgComparator } from "../../components/imageComparator/ImgComparator";
import { InfoPicture } from "../../components/infoPicture/InfoPicture";
import { SliderRange } from "../../components/sliderRange/SliderRange";
import { SeparateLine } from "../../components/separateLines/SeparateLine";
import { SizeSelector } from "../../components/SizeSelector/SizeSelector";
import { PropagateLoader } from "react-spinners";
import { PictureContext } from "../../context/PicturesContext";
import { useImageProcessing } from "../../utils/hooks/useImageProcessing";

export const MultiSize = () => {
  const {
    images, setImages,
    quality, setQuality,
    sizes, setSizes,
    originalPictureProperty,
    comparedImageProperty,
    imgWidth, setImgWidth,
    resetPictures,
  } = useContext(PictureContext);

  const {
    downloadUrls, 
    isError, 
    isLoading, 
    onSubmit, 
    onReset 
  } = useImageProcessing(images, quality, sizes);
  
  const onCancel = () => {
    onReset();
    resetPictures();
  };

  return (
    <section className="compress-picture" data-testid="multiSize-picture">
      <header
        className="compress-picture__header"
        data-testid="multiSize-picture__header"
      >
        <h2 className="compress-picture__title" role="title">
          Compression d'images multi-tailles
        </h2>
        <p className="compress-picture__sub-title" role="sub-title">
          Convertissez vos images en plusieur taille tout en conservant la
          qualité.
        </p>
      </header>
      {downloadUrls && images && !isLoading ? (
        <>
          <div className="compress-picture__comparator">
            <ImgComparator
              original={URL.createObjectURL(images)}
              compared={downloadUrls.desktop.url}
              imgWidth={imgWidth}
              setImgWidth={setImgWidth}
            />
            <div
              className="compress-picture__infos-wrapper"
              style={{ maxWidth: imgWidth }}
            >
              <InfoPicture
                pictureProperty={originalPictureProperty || {}}
                type={"originale"}
              />
              <InfoPicture
                pictureProperty={comparedImageProperty || {}}
                type={"compressed"}
              />
            </div>
            {downloadUrls &&
              Object.keys(downloadUrls).map((key) => (
                <a
                  key={key}
                  href={downloadUrls[key].url}
                  download={downloadUrls[key].name}
                  data-testid="downloadBtn"
                >
                  <span className="btn">
                    Télécharger {downloadUrls[key].name}
                  </span>
                </a>
              ))}
            <span className="btn" onClick={onCancel} role="cancel-btn">
              Annuler
            </span>
          </div>
        </>
      ) : (
        <form
          className="compress-picture__form"
          onSubmit={onSubmit}
          data-testid="multiSize-picture__form"
        >
        <AddPicture setImages={setImages} cancel={onCancel} />
        {images && (
            <InfoPicture
              pictureProperty={originalPictureProperty || {}}
              type={"origine"}
            />
          )}
          <SeparateLine />
          <label htmlFor="quality">
            <h3>Choisissez la qualité l’image</h3>
          </label>
          <p>
            Plus la qualité est bonne, plus la taille du fichier est élevée.
          </p>
          <p>Une qualité inférieure réduira donc la taille du fichier.</p>
          <SliderRange
            min={0}
            max={100}
            value={quality}
            setValue={setQuality}
          />
          <SeparateLine />
          <h3>{"Choisissez la taille de l'image"}</h3>
          <SizeSelector sizes={sizes} setSize={setSizes} />
          <SeparateLine />
          {isError && <span>{"une erreur est survenue"}</span>}
          {isLoading && !isError ? (
            <>
            <span className="btn" onClick={onCancel} role="cancel-btn">
              Annuler
            </span>
              <PropagateLoader color={"#333"} loading={isLoading} size={15} />
            </>
          ) : (
            <button
            className="btn"
            type="submit"
            disabled={!images}
            data-testid="submit-btn"
            role="convert-btn"
          >
              {"Convertir l'image"}
            </button>
          )}
        </form>
      )}
    </section>
  );
};
