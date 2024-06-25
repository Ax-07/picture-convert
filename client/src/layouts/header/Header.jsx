import { BtnStart } from "../../components/btn/Buttons";
import { Navbar } from "../../components/navigation/navbar/Navbar";
import { Link } from "react-router-dom";
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
const logo = "Picture convert";

export const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="header" data-testid="header">
      <div className="header__nav">
        <Link to="/#" className={`navbar__link`} onClick={scrollToTop}>
          <h1>{logo}</h1>
        </Link>
        <Navbar navData={navData} />
      </div>

      <BtnStart />
    </header>
  );
};
