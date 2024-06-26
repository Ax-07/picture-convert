import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";


export const Navbar = ({navData, direction}) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(
    location.pathname + location.hash
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setActiveLink(location.pathname + location.hash);
  }, [location]);

  return (
    <nav className="navbar" data-testid="navbar">
      <ul className={`navbar__list navbar__list--${direction}`}>
        {navData.map((item) => (
          <li className="navbar__item" key={item.id}>
            <Link
              to={item.link}
              className={`navbar__link ${
                activeLink === item.link ? "active" : ""
              }`}
              onClick={scrollToTop}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  navData: PropTypes.array.isRequired,
  direction: PropTypes.string,
};