import PropTypes from "prop-types";

export const SizeSelector = ({ sizes, setSize }) => {
  const onSetSize = (e) => {
    setSize({
      ...sizes,
      [e.target.id]: e.target.value,
    });
  };

  return (
      <div className= "sizeSelector" data-testid="sizeSelector">
        <div className="sizeSelector__wrapper">
          <label htmlFor="mobile" className="sizeSelector__label">Mobile</label>
          <input
            type="number"
            id="mobile"
            className="sizeSelector__input"
            value={sizes.mobile}
            onChange={onSetSize}
          />
        </div>
        <div className="sizeSelector__wrapper">
          <label htmlFor="tablet" className="sizeSelector__label">Tablet</label>
          <input
            type="number"
            id="tablet"
            className="sizeSelector__input"
            value={sizes.tablet}
            onChange={onSetSize}
          />
        </div>
        <div className="sizeSelector__wrapper">
          <label htmlFor="desktop" className="sizeSelector__label">Desktop</label>
          <input
            type="number"
            id="desktop"
            className="sizeSelector__input"
            value={sizes.desktop}
            onChange={onSetSize}
          />
        </div>
      </div>
  );
};

SizeSelector.propTypes = {
  sizes: PropTypes.object,
  setSize: PropTypes.func,
  setOption: PropTypes.func,
};
