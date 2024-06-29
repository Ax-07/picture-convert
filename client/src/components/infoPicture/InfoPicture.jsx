import PropTypes from "prop-types";

export const InfoPicture = ({pictureProperty, type}) => {
    let displayType;
    switch (type) {
      case "origine":
        displayType = "originale";
        break;
      case "compressed":
        displayType = "compressée";
        break;
      default:
        displayType = "originale";
        break;
    }
    return (
      <div className="picture-info">
      <h3 className="picture-info__title">{`Image ${displayType}`}</h3>
        <p className="picture-info__description">
          {"Dimensions :"} {pictureProperty.width} x {pictureProperty.height}
        </p>
        <p className="picture-info__description">
          {"Taille :"} {Math.round(pictureProperty.size / 1024)} Ko
        </p>
      </div>
    );
  }
  
  InfoPicture.propTypes = {
    type: PropTypes.string,
    pictureProperty: PropTypes.shape({
      size: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  };