import PropTypes from "prop-types";

export const PreviewPicture = ({
  previewPicture,
  onCancel,
  isDisplayPreviewPicture,
}) => {
  return (
    <div
      data-testid="preview"
      className={`add-picture__preview ${
        isDisplayPreviewPicture ? "add-picture__preview--active" : ""
      }`}
    >
      <img src={previewPicture} alt="preview" role="img" />
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
  );
};

PreviewPicture.propTypes = {
  previewPicture: PropTypes.string,
  onCancel: PropTypes.func,
  isDisplayPreviewPicture: PropTypes.bool,
};
