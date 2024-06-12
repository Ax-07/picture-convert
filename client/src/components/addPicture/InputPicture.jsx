import PropTypes from "prop-types";
import { useDragNDrop } from "../../utils/hooks/useDragNDrop";
import { icons } from "../../assets/icons/icons";

export const InputPicture = ({ onInputChange, inputRef }) => {
  const { dragging, dragOver, dragEnter, dragLeave, fileDrop } = useDragNDrop();
  return (
    <div
      data-testid="inputPicture"
      className={`add-picture__wrapper ${
        dragging ? "add-picture__wrapper--dragging" : ""
      }`}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={(e) => {
        const files = fileDrop(e);
        if (files.length) {
          onInputChange({ target: { files } });
        }
      }}
    >
      <span className="add-picture__icon" role="icon">
        {icons.image}
      </span>
      <label
        htmlFor="picture"
        className="add-picture__wrapper add-picture__btn"
        role="button"
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
      <p className="add-picture__txt" role="txt">
        jpg, png : 2mo max
      </p>
    </div>
  );
};

InputPicture.propTypes = {
  onInputChange: PropTypes.func,
  inputRef: PropTypes.object,
};
