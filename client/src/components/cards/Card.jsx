import PropTypes from "prop-types";

export const Card = ({ title, description, image }) => {
    console.log(image);
  return (
    <article className="card">
      <div className="card__image" >
        {image}
      </div>
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
      </div>
    </article>
  );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};