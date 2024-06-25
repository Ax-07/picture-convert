import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navbar } from "../navigation/navbar/Navbar";
import { BtnStart } from "../btn/Buttons";

const navData = [
    {
      id: 1,
      name: "Comment ça marche ?",
      link: "/#how-it-works",
    },
    {
      id: 2,
      name: "A propos",
      link: "/#about",
    },
    {
      id: 3,
      name: "Conseil",
      link: "/#advice",
    },
  ];
export const BtnBurger = ({ windowWidth }) => {
  const [isOpen, setIsOpen] = useState(false);

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
