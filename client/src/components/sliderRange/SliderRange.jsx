import PropTypes from "prop-types";

export const SliderRange = ({ min, max, value, setValue }) => {
  return (
    <div className="sliderRange" data-testid="sliderRange">
      <input
        type="number"
        className="sliderRange__value"
        onChange={(e) => setValue(Number(e.target.value))}
        id="quality"
        min={1}
        max={100}
        value={value}
      />
      <input
        data-testid="slider"
        className="sliderRange__input"
        type="range"
        min={min}
        max={max}
        value={value}
        step={1}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className="sliderRange__wrapper" data-testid="wrapper">
        <p role="paragraph">{0}</p>
        <p role="paragraph">|</p>
        <p role="paragraph">{20}</p>
        <p role="paragraph">|</p>
        <p role="paragraph">{40}</p>
        <p role="paragraph">|</p>
        <p role="paragraph">{60}</p>
        <p role="paragraph">|</p>
        <p role="paragraph">{80}</p>
        <p role="paragraph">|</p>
        <p role="paragraph">{max}</p>
      </div>
    </div>
  );
};

SliderRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};
