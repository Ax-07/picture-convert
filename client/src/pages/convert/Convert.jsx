import { useEffect, useState } from "react";
import { AddPicture } from "../../components/addPicture/AddPicture";
import { convertPicture } from "../../api/convertPictureApi";
import { InfoPicture } from "../../components/infoPicture/InfoPicture";

export const Convert = () => {
  const [images, setImages] = useState();
  const [reponse, setReponse] = useState();
  const [url, setUrl] = useState();
  const [originalPictureProperty, setOriginalPictureProperty] = useState({
    size: 0,
    width: 0,
    height: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setImages(null);
    setReponse(null);
    setUrl(null);
    setOriginalPictureProperty({ size: 0, width: 0, height: 0 });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("images", images);

    try {
      // Appeler la fonction convertPicture avec les données du formulaire
      const response = await convertPicture(formData);
      if (response) setIsLoading(false);
      setReponse(response);
      setUrl(
        window.URL.createObjectURL(
          new Blob([new Uint8Array(response.buffer.data)], {
            type: "image/webp",
          })
        )
      );
      console.log("response : ", response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (images) {
      const img = new Image();
      img.onload = function () {
        setOriginalPictureProperty({
          size: images.size,
          width: this.width,
          height: this.height,
        });
      };
      img.src = URL.createObjectURL(images);
    }
  }, [
    images,
    originalPictureProperty.size,
    originalPictureProperty.width,
    originalPictureProperty.height,
  ]);

  return (
    <section className="compress-picture" data-testid="convert-picture">
      <header
        className="compress-picture__header"
        data-testid="convert-picture__header"
      >
        <h2 className="compress-picture__title">Convertir une image</h2>
        <p className="compress-picture__sub-title">
          Réduisez la taille de vos images tout en conservant la qualité.
        </p>
      </header>
      <form
        className="compress-picture__form"
        onSubmit={onSubmit}
        data-testid="convert-picture__form"
      >
        <AddPicture images={images} setImages={setImages} />
        {reponse ? (
          <>
            <a
              className="btn"
              href={url}
              onClick={() => resetForm()}
              download={reponse.originalname}
              data-testid="downloadBtn"
            >
              {`Télécharger ${reponse.originalname}`}
            </a>
            <span className="btn" onClick={() => resetForm()} role="cancel-btn">
              Annuler
            </span>
          </>
        ) : (
          <button className="btn" type="submit" disabled={!images}>
            {isLoading ? "en cours" : "Convertir l'image"}
          </button>
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
