import { useContext } from "react";
import PropTypes from "prop-types";
import { SliderRange } from "../sliderRange/SliderRange";
import { SeparateLine } from "../separateLines/SeparateLine";
import { SizeSelector } from "../SizeSelector/SizeSelector";
import { PropagateLoader } from "react-spinners";
import { PictureContext } from "../../context/PicturesContext";
import { useImageProcessing } from "../../utils/hooks/useImageProcessing";

export const GenericPictureForm = ({ config }) => {
  const {
    images,
    reponse,
    quality,
    setQuality,
    sizes,
    setSizes,
    resetPictures,
    downloadUrls,
    downloadUrl
  } = useContext(PictureContext);

  const { isError, isLoading, onSubmit, onReset } = useImageProcessing(images, quality, sizes);

  const onCancel = () => {
    onReset();
    resetPictures();
  };

  return (
    <div className="application__form genericPictureForm">
      <SeparateLine />
      {!reponse ? (
        <form
          className="genericPictureForm__form"
          onSubmit={onSubmit}
          data-testid="picture-form"
        >
          <PictureFormHeader title={config.title} subtitle={config.subtitle} />
          {config.showQuality && (
            <>
              <SeparateLine />
              <label htmlFor="quality">
                <h3>Qualité</h3>
              </label>

              <SliderRange
                min={0}
                max={100}
                value={quality}
                setValue={setQuality}
              />
              <SeparateLine />
            </>
          )}
          {config.showSizes && (
            <>
              <h3>Dimensions</h3>
              <SizeSelector sizes={sizes} setSize={setSizes} />
              <SeparateLine />
            </>
          )}
          {isError && <ErrorState errorMessage="une erreur est survenue" />}
          {isLoading ? (
            <LoadingState onCancel={onCancel} />
          ) : (
            <button className="btn" type="submit" disabled={!images} role="convert-btn">
              Convertir l'image
            </button>
          )}
        </form>
      ) : (
        <>
          {downloadUrls &&
            Object.keys(downloadUrls).map((key) => (
              <a key={key} href={downloadUrls[key].url} 
              download={downloadUrls[key].name} data-testid="downloadBtn"
              >
                <span className="btn btn-download">
                  Télécharger {downloadUrls[key].name}
                </span>
              </a>
            ))}
          {downloadUrl && (
            <a
            className="btn"
            href={downloadUrl}
            download={reponse.originalname}
            data-testid="downloadBtn"
            role="download-btn"
          >
            {`Télécharger ${reponse.originalname}`}
          </a>
          )}
          <span className="btn" onClick={onCancel} role="cancel-btn">
            Annuler
          </span>
        </>
      )}
    </div>
  );
};

GenericPictureForm.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    showQuality: PropTypes.bool,
    showSizes: PropTypes.bool,
  }).isRequired,
};

const PictureFormHeader = ({ title, subtitle }) => (
  <header
    className="genericPictureForm__header"
    data-testid="picture-form-header"
  >
    <h2 className="genericPictureForm__header-title" role="title">
      {title}
    </h2>
    <p className="genericPictureForm__header-subtitle" role="sub-title">
      {subtitle}
    </p>
  </header>
);

PictureFormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
const LoadingState = ({ onCancel }) => (
  <>
    <button className="btn" onClick={onCancel}>
      Annuler
    </button>
    <PropagateLoader color={"#333"} loading size={15} />
  </>
);

LoadingState.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

const ErrorState = ({ errorMessage }) => <span>{errorMessage}</span>;

ErrorState.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
