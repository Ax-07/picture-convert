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
        displayType = type;
        break;
    }
    return (
      <div className="picture-info">
      <h3>{`Image ${displayType}`}</h3>
        <p>
          {"Dimensions :"} {pictureProperty.width} x {pictureProperty.height}
        </p>
        <p>
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