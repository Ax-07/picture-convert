import { useEffect, useState } from "react";
import { AddPicture } from "../../components/addPicture/AddPicture";
import { compressPicture } from "../../api/convertPictureApi";
import { ImgComparator } from "../../components/imageComparator/ImgComparator";
import { InfoPicture } from "../../components/infoPicture/InfoPicture";
import { useDispatch } from "react-redux";
import { setCompressedPicture, setOriginalPicture } from "../../app/compressSlice";
import { SliderRange } from "../../components/sliderRange/SliderRange";
import { SeparateLine } from "../../components/separateLines/SeparateLine";

export const Compress = () => {
  const [images, setImages] = useState();
  const [imgWidth, setImgWidth] = useState(0);
  const [quality, setQuality] = useState(80);
  const [reponse, setReponse] = useState();
  const [url, setUrl] = useState();
  const [originalPictureProperty, setOriginalPictureProperty ] = useState({ size: 0, width: 0, height: 0 });
  const [compressedImageProperty, setCompressedImageProperty] = useState({ size: 0, width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const resetForm = () => {
    setImages(null);
    setQuality(80);
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
    formData.append("quality", quality);

    try {
      // Appeler la fonction convertPicture avec les données du formulaire
      const response = await compressPicture(formData);
      if (response) setIsLoading(false);
      setReponse(response);
      setUrl(
        window.URL.createObjectURL(
          new Blob([new Uint8Array(response.buffer.data)], {
            type: "image/webp",
          })
        )
      );
      dispatch(setOriginalPicture(images));
      dispatch(setCompressedPicture(response));
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
  }, [images, originalPictureProperty.size, originalPictureProperty.width, originalPictureProperty.height]);

  useEffect(() => {
    if (reponse) {
    const blob = new Blob([new Uint8Array(reponse.buffer.data)], {
      type: "image/webp",
    });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    img.onload = function () {
      setCompressedImageProperty({
        size: reponse.buffer.data.length,
        width: this.width,
        height: this.height,
      });
    };
    }
  }, [reponse, compressedImageProperty.size, compressedImageProperty.width, compressedImageProperty.height]);

  return (
    <section className="compress-picture">
      <header className="compress-picture__header">
        <h2 className="compress-picture__title">Compresser une image</h2>
        <p className="compress-picture__sub-title">
          Réduisez la taille de vos images tout en conservant la qualité.
        </p>
      </header>
      {reponse ? (
        <>
          <div className="compress-picture__comparator">
            <ImgComparator
              original={URL.createObjectURL(images)}
              compared={url}
              imgWidth={imgWidth}
              setImgWidth={setImgWidth}
            />
            <div className="compress-picture__infos-wrapper" style={{ maxWidth: imgWidth }}>
              <InfoPicture pictureProperty={originalPictureProperty} type={"originale"}/>
              <InfoPicture pictureProperty={compressedImageProperty} type={"compressed"} />
            </div>
            <a className="btn" href={url} download={reponse.originalname}>
              {`Télécharger ${reponse.originalname}`}
            </a>
            <span className="btn" onClick={() => resetForm()}>Annuler</span>
          </div>
        </>
      ) : (
        <form className="compress-picture__form" onSubmit={onSubmit}>
          <AddPicture setImages={setImages} />

          <label htmlFor="quality">
            <h3>Choisissez la qualité l’image</h3>
          </label>
          <SeparateLine />
          <p>
            Plus la qualité est bonne, plus la taille du fichier est élevée.
          </p>
          <p>Une qualité inférieure réduira donc la taille du fichier.</p>
          <br />
          <input
            type="number"
            onChange={(e) => setQuality(Number(e.target.value))}
            id="quality"
            min={1}
            max={100}
            value={quality}
          />
          <SliderRange
            min={0}
            max={100}
            value={quality}
            setValue={setQuality}
          />
          <button className="btn" type="submit" disabled={!images}>
            {isLoading ? "en cours" : "Convertir l'image"}
          </button>
          {images && (
            <InfoPicture
            pictureProperty={originalPictureProperty}
              type={"origine"}
            />
          )}
        </form>
      )}
    </section>
  );
};
