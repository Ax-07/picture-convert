import { useContext } from "react";
import { AddPicture } from "../../../components/addPicture/AddPicture";
import { InfoPicture } from "../../../components/infoPicture/InfoPicture";
import { PropagateLoader } from "react-spinners";
import { PictureContext } from "../../../context/PicturesContext";
import { useImageProcessing } from "../../../utils/hooks/useImageProcessing";

export const Convert = () => {
  const {
    images, setImages,
    originalPictureProperty,
    resetPictures,
  } = useContext(PictureContext);


  const {
    response,
    downloadUrl,
    isError,
    isLoading,
    onSubmit,
    onReset,
  } = useImageProcessing(images);


  const onCancel = () => {
    onReset();
    resetPictures();
  };
  console.log("downloadUrl", downloadUrl)

  return (
    <section className="compress-picture" data-testid="convert-picture">
      <header
        className="compress-picture__header"
        data-testid="convert-picture__header"
      >
        <h2 className="compress-picture__title" role="title">Convertir une image</h2>
        <p className="compress-picture__sub-title" role="sub-title">
          Convertissez simplement vos images au format webp.
        </p>
      </header>
      <form
        className="compress-picture__form"
        onSubmit={onSubmit}
        data-testid="convert-picture__form"
      >
        <AddPicture setImages={setImages} cancel={onCancel} />
        {downloadUrl && !isLoading ? (
          <>
            <a
              className="btn"
              href={downloadUrl}
              download={response?.originalname}
              data-testid="downloadBtn"
              role="download-btn"
            >
              {`Télécharger ${response?.originalname}`}
            </a>
            <span className="btn" onClick={onCancel} role="cancel-btn">
              Annuler
            </span>
          </>
        ) : (
          <>
          {isError && <span>{"une erreur est survenue"}</span>}
          {isLoading && !isError ? (
            <>
            <button className="btn" onClick={onCancel}>Annuler</button>
            <PropagateLoader color={"#333"} loading={isLoading} size={15} />
            </>
          ) : (
            <button className="btn" type="submit" disabled={!images} role="convert-btn">
              {"Convertir l'image"}
            </button>
          )}
          </>
        )}
        {images && (
          <InfoPicture
            pictureProperty={originalPictureProperty}
            type={"origine"}
          />
        )}
      </form>
    </section>
  );
};
