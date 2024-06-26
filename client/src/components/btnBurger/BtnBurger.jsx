import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar } from "../navigation/navbar/Navbar";
import { BtnStart } from "../btn/Buttons";

const logo = "Picture convert";

const navData = [
    { id: 1, name: "Comment ça marche ?", link: "/#how-it-works" },
    { id: 2, name: "A propos", link: "/#about" },
    { id: 3, name: "Conseil", link: "/#advice"},
    { id: 4, name: "Convertir", link: "/application/convert" },
    { id: 5, name: "Compresser", link: "/application/compress" },
    { id: 6, name: "Multi-Size", link: "/application/multi-size" },
  ];
export const BtnBurger = ({ windowWidth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (windowWidth > 1024) {
      setIsOpen(false);
    }
  }, [windowWidth]);

  return (
    <div className={`burgerBtn ${isOpen ? "burgerBtn--open" : ""}`} onClick={toggleMenu}>
      {windowWidth < 1024 ? (
        <>
        <div className="burgerBtn__lines">
          <span className="burgerBtn__line"></span>
          <span className="burgerBtn__line"></span>
          <span className="burgerBtn__line"></span>
        </div>
 <div className="burgerBtn__menu">
 <Link to="/#" className={`navbar__link`} onClick={scrollToTop}>
          <h1>{logo}</h1>
        </Link>
          <Navbar navData={navData} />
          <BtnStart />
        </div>
        </>
      ) : null}
    </div>
  );
};

BtnBurger.propTypes = {
  windowWidth: PropTypes.number.isRequired,
};
