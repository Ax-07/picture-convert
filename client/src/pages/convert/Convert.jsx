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
  const [compressedImageProperty, setCompressedImageProperty] = useState({
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
    setCompressedImageProperty({ size: 0, width: 0, height: 0 });
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
    <section className="compress-picture">
      <header className="compress-picture__header">
        <h2 className="compress-picture__title">Compresser une image</h2>
        <p className="compress-picture__sub-title">
          Réduisez la taille de vos images tout en conservant la qualité.
        </p>
      </header>
      <form className="compress-picture__form" onSubmit={onSubmit}>
        <AddPicture setImages={setImages} />
        {images && !reponse && (
          <span className="btn" onClick={() => resetForm}>
            Annuler
          </span>
        )}
        {reponse ? (
          <a className="btn" href={url} download={reponse.originalname}>
            {`Télécharger ${reponse.originalname}`}
          </a>
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
