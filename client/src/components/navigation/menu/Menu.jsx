import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

export const Menu = ({ navData }) => {
  return (
    <fieldset className="menu">
      <legend className="menu__title">Menu</legend>
      <ul className="application__menu menu__list">
        {navData.map((item) => (
          <li key={item.id}>
            <BtnMenu data={item} />
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

const BtnMenu = ({ data }) => {
  const location = useLocation();
  const activeLink = location.pathname + location.hash;

  return (
    <NavLink
      to={data.link}
      className={`btn btn-menu ${
        activeLink === data.link ? "btn-menu--active" : ""
      }`}
      aria-label={`menu ${data.name}`}
      data-name={data.id}
    >
      {data.icon}
    </NavLink>
  );
};

BtnMenu.propTypes = {
  data: PropTypes.object.isRequired,
};

Menu.propTypes = {
  navData: PropTypes.array.isRequired,
};
