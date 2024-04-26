import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { InputPicture } from "./InputPicture";
import { PreviewPicture } from "./PreviewPicture";


export const AddPicture = ({ setImages }) => {
  const [isDisplayPreviewPicture, setIsDisplayPreviewPicture] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(null);
  const inputRef = useRef();

  const onInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      console.log("fileSizeInMB:", fileSizeInMB);
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
  projetform: PropTypes.object,
};
