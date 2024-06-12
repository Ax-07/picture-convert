import { useContext } from "react";
import { AddPicture } from "../../components/addPicture/AddPicture";
import { ImgComparator } from "../../components/imageComparator/ImgComparator";
import { InfoPicture } from "../../components/infoPicture/InfoPicture";
import { SliderRange } from "../../components/sliderRange/SliderRange";
import { SeparateLine } from "../../components/separateLines/SeparateLine";
import { PropagateLoader } from "react-spinners";
import { PictureContext } from "../../context/PicturesContext";
import { useImageProcessing } from "../../utils/hooks/useImageProcessing";

export const Compress = () => {
  const {
    images, setImages,
    quality, setQuality,
    originalPictureProperty,
    comparedImageProperty,
    imgWidth, setImgWidth,
    resetPictures,
  } = useContext(PictureContext);

  const { response, downloadUrl, isError, isLoading, onSubmit, onReset } =
    useImageProcessing(images, quality);

  const onCancel = () => {
    onReset();
    resetPictures();
  };

  return (
    <section className="compress-picture" data-testid="compress-picture">
      <header
        className="compress-picture__header"
        data-testid="compress-picture__header"
      >
        <h2 className="compress-picture__title" role="title">Compresser une image</h2>
        <p className="compress-picture__sub-title" role="sub-title">
          Réduisez la taille de vos images tout en conservant la qualité.
        </p>
      </header>
      {response && images && downloadUrl && !isLoading ? (
        <>
          <div
            className="compress-picture__comparator"
            data-testid="compress-picture__comparator"
          >
            <ImgComparator
              original={URL.createObjectURL(images)}
              compared={downloadUrl}
              imgWidth={imgWidth}
              setImgWidth={setImgWidth}
            />
            <div
              className="compress-picture__infos-wrapper"
              style={{ maxWidth: imgWidth }}
            >
              <InfoPicture
                pictureProperty={originalPictureProperty}
                type={"originale"}
              />
              <InfoPicture
                pictureProperty={comparedImageProperty}
                type={"compressed"}
              />
            </div>
            <a
              className="btn"
              href={downloadUrl}
              download={response.originalname}
              data-testid="downloadBtn"
              role="download-btn"
            >
              {`Télécharger ${response.originalname}`}
            </a>
            <span className="btn" onClick={onCancel} role="cancel-btn">
              Annuler
            </span>
          </div>
        </>
      ) : (
        <form
          className="compress-picture__form"
          onSubmit={onSubmit}
          data-testid="compress-picture__form"
        >
        <AddPicture setImages={setImages} cancel={onCancel} />
        {images && (
            <InfoPicture
              pictureProperty={originalPictureProperty}
              type={"origine"}
            />
          )}
          <label htmlFor="quality">
            <h3>Choisissez la qualité l’image</h3>
          </label>
          <SeparateLine />
          <p>
            Plus la qualité est bonne, plus la taille du fichier est élevée.
          </p>
          <p>Une qualité inférieure réduira donc la taille du fichier.</p>
          <br />
          <SliderRange
            min={0}
            max={100}
            value={quality}
            setValue={setQuality}
          />
          <SeparateLine />
          {isError && <span>{"une erreur est survenue"}</span>}
          {isLoading && !isError ? (
            <>
              <button className="btn" onClick={onCancel}>
                Annuler
              </button>
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
