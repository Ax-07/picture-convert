import { useEffect, useState } from "react";
import { AddPicture } from "../../components/addPicture/AddPicture";
import { multiSizePicture } from "../../api/convertPictureApi";
import { ImgComparator } from "../../components/imageComparator/ImgComparator";
import { InfoPicture } from "../../components/infoPicture/InfoPicture";
import { SliderRange } from "../../components/sliderRange/SliderRange";
import { SeparateLine } from "../../components/separateLines/SeparateLine";
import { SizeSelector } from "../../components/SizeSelector/SizeSelector";

export const MultiSize = () => {
  const [images, setImages] = useState();
  const [imgWidth, setImgWidth] = useState(0);
  const [quality, setQuality] = useState(80);
  const [reponse, setReponse] = useState();
  const [originalPictureProperty, setOriginalPictureProperty ] = useState({ size: 0, width: 0, height: 0 });
  const [compressedImageProperty, setCompressedImageProperty] = useState({ size: 0, width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [ sizes, setSizes ] = useState({
    mobile: 640,
    tablet: 1280,
    desktop: 1920
  });
  const [imgComp, setImgComp] = useState({
    mobile: { url: "", name: "" },
    tablet: { url: "", name: "" },
    desktop: { url: "", name: "" }
  });

  const resetForm = () => {
    setImages(null);
    setQuality(80);
    setReponse(null);
    // setUrl(null);
    setImgComp({
      mobile: { url: "", name: "" },
      tablet: { url: "", name: "" },
      desktop: { url: "", name: "" }
    });
    setOriginalPictureProperty({ size: 0, width: 0, height: 0 });
    setCompressedImageProperty({ size: 0, width: 0, height: 0 });
  };
  const createBlobUrl = (bufferData) => {
    const blob = new Blob([new Uint8Array(bufferData)], { type: "image/webp" });
    return window.URL.createObjectURL(blob);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("images", images);
    formData.append("quality", quality);
    formData.append("sizes", JSON.stringify(sizes));
    try {
      console.log("formData : ", formData);
      // Appeler la fonction convertPicture avec les données du formulaire
      const response = await multiSizePicture(formData);
      if (response) setIsLoading(false);
      setReponse(response);
      const urls = { mobile: "", tablet: "", desktop: "" };
      const originalsName = { mobile: "", tablet: "", desktop: "" };
      response?.forEach((res) => {
        urls.desktop = createBlobUrl(res.desktop.buffer.data);
        urls.mobile = createBlobUrl(res.mobile.buffer.data);
        urls.tablet = createBlobUrl(res.tablet.buffer.data);
        originalsName.desktop = res.desktop.originalname;
        originalsName.mobile = res.mobile.originalname;
        originalsName.tablet = res.tablet.originalname;
      });
      // setUrl(urls);
      // setOriginalsName(originalsName);
      setImgComp({
        mobile: { url: urls.mobile, name: originalsName.mobile },
        tablet: { url: urls.tablet, name: originalsName.tablet },
        desktop: { url: urls.desktop, name: originalsName.desktop }
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log("imgComp : ", imgComp);

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
      console.log("reponse : ", reponse[0]);
    const blob = new Blob([new Uint8Array(reponse[0].desktop.buffer.data)], {
      type: "image/webp",
    });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    img.onload = function () {
      setCompressedImageProperty({
        size: reponse[0].desktop.buffer.data.length,
        width: this.width,
        height: this.height,
      });
    };
    }
  }, [reponse, compressedImageProperty.size, compressedImageProperty.width, compressedImageProperty.height]);

  return (
    <section className="compress-picture" data-testid="multiSize-picture">
      <header className="compress-picture__header" data-testid="multiSize-picture__header">
        <h2 className="compress-picture__title" role="title">Compresser une image</h2>
        <p className="compress-picture__sub-title" role="sub-title">
          Réduisez la taille de vos images tout en conservant la qualité.
        </p>
      </header>
      {reponse ? (
        <>
          <div className="compress-picture__comparator">
            <ImgComparator
              original={URL.createObjectURL(images)}
              compared={imgComp.desktop.url}
              imgWidth={imgWidth}
              setImgWidth={setImgWidth}
            />
            <div className="compress-picture__infos-wrapper" style={{ maxWidth: imgWidth }}>
              <InfoPicture pictureProperty={originalPictureProperty} type={"originale"}/>
              <InfoPicture pictureProperty={compressedImageProperty} type={"compressed"} />
            </div>
            {imgComp && Object.keys(imgComp).map((key) => (
              <a key={key} href={imgComp[key].url} download={imgComp[key].name} data-testid="downloadBtn">
                <span className="btn">Télécharger {imgComp[key].name}</span>
              </a>
            ))}
            <span className="btn" onClick={() => resetForm()} role="cancel-btn">Annuler</span>
          </div>
        </>
      ) : (
        <form className="compress-picture__form" onSubmit={onSubmit} data-testid="multiSize-picture__form">
          <AddPicture setImages={setImages} />
          {images && (
            <InfoPicture
            pictureProperty={originalPictureProperty}
              type={"origine"}
            />
          )}

          <SeparateLine />
          <label htmlFor="quality">
            <h3>Choisissez la qualité l’image</h3>
          </label>
          <br />
          <p>
            Plus la qualité est bonne, plus la taille du fichier est élevée.
          </p>
          <p>Une qualité inférieure réduira donc la taille du fichier.</p>
          <br />
          <SliderRange min={0} max={100} value={quality} setValue={setQuality} />
          <br />
          <br />
          <p></p>
          <SeparateLine />
          <h3>{"Choisissez la taille de l'image"}</h3>
          <br />
          <SizeSelector sizes={sizes} setSize={setSizes}/>
          <br />
          <br />
          <SeparateLine />
          <button className="btn" type="submit" disabled={!images}>
            {isLoading ? "en cours" : "Convertir l'image"}
          </button>
        </form>
      )}
    </section>
  );
};

