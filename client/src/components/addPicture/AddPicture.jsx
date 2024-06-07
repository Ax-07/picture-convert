import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { InputPicture } from "./InputPicture";
import { PreviewPicture } from "./PreviewPicture";
import { useEffect } from "react";

export const AddPicture = ({ images, setImages }) => {
  const [isDisplayPreviewPicture, setIsDisplayPreviewPicture] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(null);
  const inputRef = useRef();
  const maxSize = 2; // 2mo

  const onInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > maxSize) {
        alert("Le fichier est trop grand. Veuillez choisir un fichier de moins de 4 Mo.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewPicture(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setIsDisplayPreviewPicture(true);
      setImages(selectedFile);
    }
  };

  const onCancel = () => {
    setImages(null);
    setPreviewPicture(null);
    setIsDisplayPreviewPicture(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if(!images && isDisplayPreviewPicture) onCancel();
  },[images]);

  return (
    <div className="add-picture" data-testid="addPicture">
      {!isDisplayPreviewPicture && (
        <InputPicture onInputChange={onInputChange} inputRef={inputRef} />
      )}
      <PreviewPicture
        previewPicture={previewPicture}
        onCancel={onCancel}
        isDisplayPreviewPicture={isDisplayPreviewPicture}
      />
    </div>
  );
};

AddPicture.propTypes = {
  images: PropTypes.object,
  setImages: PropTypes.func,
};
