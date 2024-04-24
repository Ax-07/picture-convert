import PropTypes from "prop-types";

export const SizeSelector = ({ sizes, setSize }) => {
  const onSetSize = (e) => {
    setSize({
      ...sizes,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <div className= "sizeSelector">
        <div className="sizeSelector__wrapper">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            id="mobile"
            value={sizes.mobile}
            onChange={onSetSize}
          />
        </div>
        <div className="sizeSelector__wrapper">
          <label htmlFor="tablet">Tablet</label>
          <input
            type="number"
            id="tablet"
            value={sizes.tablet}
            onChange={onSetSize}
          />
        </div>
        <div className="sizeSelector__wrapper">
          <label htmlFor="desktop">Desktop</label>
          <input
            type="number"
            id="desktop"
            value={sizes.desktop}
            onChange={onSetSize}
          />
        </div>
      </div>
    </>
  );
};

SizeSelector.propTypes = {
  sizes: PropTypes.object,
  setSize: PropTypes.func,
  setOption: PropTypes.func,
};
