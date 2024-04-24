import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDragNDrop } from "../../utils/hooks/useDragNDrop";
import { icons } from "../../assets/icons/icons";


export const AddPicture = ({ setImages }) => {
  const [isDisplayPreviewPicture, setIsDisplayPreviewPicture] = useState(false);
  const [previewPicture, setPreviewPicture] = useState(null);
  const inputRef = useRef();
  const { dragging, dragOver, dragEnter, dragLeave, fileDrop } = useDragNDrop();

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
      {isDisplayPreviewPicture && (
        <div  data-testid="preview" className={`add-picture__preview ${isDisplayPreviewPicture ? "add-picture__preview--active" : ""}`}>
          <img src={previewPicture} alt="preview" role="img"/>
          <span
          tabIndex="0"
          role="closebutton"
          className="btn-close"
          onClick={() => onCancel()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCancel();
            }
          }}
        >
          ✖️
        </span>
        </div>
      )}
      <div
        className={`add-picture__wrapper ${dragging ? "dragging" : ""}`}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={(e)=> {
          const files = fileDrop(e);
          if (files.length) {
            onInputChange({ target: { files } });
          }
        }}
      >
        <span className="add-picture__icon">{icons.image}</span>
        <label
          htmlFor="picture"
          className="add-picture__wrapper add-picture__btn"
        >
          {icons.plusCircle}
        </label>
        <input
          type="file"
          name="picture"
          id="picture"
          className="add-picture__input"
          onChange={onInputChange}
          ref={inputRef}
          role="addPictureButton"
        />
        <p className="add-picture__txt">jpg, png : 15mo max</p>
      </div>
    </div>
  );
};

AddPicture.propTypes = {
  images: PropTypes.object,
  setImages: PropTypes.func,
  projetform: PropTypes.object,
};
