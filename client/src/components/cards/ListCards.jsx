import PropTypes from "prop-types";

export const ListCards = ({ data }) => {
  return (
    <ul className="list-cards">
      {data.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </ul>
  );
};

const Card = ({ title, description, image }) => {
    console.log(image);
  return (
    <li className="list-cards__item">
      <article>
        <div className="list-cards__image">{image}</div>
        <div className="list-cards__content">
          <h3 className="list-cards__title">{title}</h3>
          <p className="list-cards__description">{description}</p>
        </div>
      </article>
    </li>
  );
};

ListCards.propTypes = {
  data: PropTypes.array.isRequired,
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired,
};
