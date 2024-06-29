import { BtnStart } from "../../components/btn/Buttons";
import { Navbar } from "../../components/navigation/navbar/Navbar";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { BtnBurger } from "../../components/btnBurger/BtnBurger";

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
  const { windowWidth } = useWindowSize();
  const desktopView = windowWidth > 1024;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="header" data-testid="header">
      <div className="header__nav">
        <Link to="/#" className={`navbar__link`} onClick={scrollToTop}>
          <h1 className="navbar__link-logo">{logo}</h1>
        </Link>
        { desktopView && <Navbar navData={navData} /> }
      </div>

      {desktopView && <BtnStart />}
      {!desktopView && <BtnBurger windowWidth={windowWidth} />}
    </header>
  );
};
