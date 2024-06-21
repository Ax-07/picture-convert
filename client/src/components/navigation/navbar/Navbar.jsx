import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
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

  const logo = "Picture convert";
  return (
    <nav className="navbar" data-testid="navbar">
      <ul className="navbar__list">
        <li className="navbar__item" data-testid="logo">
          <Link
            to="/#"
            className={`navbar__link`}
            onClick={scrollToTop}
          >
            <h1>{logo}</h1>
          </Link>
        </li>
        <li>
          <Link
            to="/#features"
            className={`navbar__link ${
              activeLink === "/#features" ? "active" : ""
            }`}
          >
            Features
          </Link>
        </li>
        <li className="navbar__item">
          <Link
            to="/#about"
            className={`navbar__link ${
              activeLink === "/#about" ? "active" : ""
            }`}
          >
            A propos
          </Link>
        </li>
        <li className="navbar__item">
          <Link
            to="/guide"
            className={`navbar__link ${
              activeLink === "/guide" ? "active" : ""
            }`}
          >
            Guide
          </Link>
        </li>
        {/* <li className='navbar__item'><Link to="/convert" className='navbar__link'>Convert</Link></li>
                <li className='navbar__item'><Link to="/compress" className='navbar__link'>Compress</Link></li>
                <li className='navbar__item'><Link to="/multi-size" className='navbar__link'>Multi-size</Link></li>
                <li className='navbar__item'><Link to="/guide" className='navbar__link'>Guide</Link></li> */}
      </ul>
    </nav>
  );
};
