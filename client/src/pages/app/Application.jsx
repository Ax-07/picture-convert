import { Link, useLocation } from "react-router-dom";
import { Convert } from "../app/convert/Convert";
import { Compress } from "../app/compress/Compress";
import { MultiSize } from "../app/multiSize/MultiSize";
import { Routes, Route } from "react-router-dom";
import waveTop from "../../assets/svg/WaveTop.svg";
import refresh from "../../assets/svg/faRefresh.svg";
import compress from "../../assets/svg/faCompressArrowsAlt.svg";
import photoStack from "../../assets/svg/photo.stack.svg";
import { Menu } from "../../components/navigation/menu/Menu";
import home from "../../assets/svg/faHome.svg";
import { IconsHome, IconCompress, IconPhotoStack, IconRefresh } from "../../components/IconsCompononents/IconsComponents";


const navData = [
  { id: 1, name: "Accueil", link: "/application", icon: <IconsHome /> },
  { id: 2, name: "Convertir", link: "/application/convert", icon: <IconRefresh />},
  { id: 3, name: "Compresser", link: "/application/compress", icon: <IconCompress />},
  { id: 4, name: "Multi-Size", link: "/application/multi-size", icon: <IconPhotoStack />},
];

export const Application = () => {

  const location = useLocation();
  const isHome = location.pathname === "/application";
  return (
      <section id="application" className="application">
        <img className="home__container-border" src={waveTop} alt="" />
        <div className="application__dashboard">
          {!isHome && <Menu navData={navData} />}
          <Routes>
            <Route path="*" element={<DefaultMessage />} />
            <Route path="convert" element={<Convert />} />
            <Route path="compress" element={<Compress />} />
            <Route path="multi-size" element={<MultiSize />} />
          </Routes>
          </div>
      </section>
  );
};

const DefaultMessage = () => {
  return (
    <section>
      <h1 className="application__title">Bienvenue !</h1>
      <p className="application__subtitle">
        Veuillez sélectionner une option dans le menu.
      </p>
      <div className="application__list">
        <Link to="/application/convert" className="application__btn-link">
          <img src={refresh} alt="icon liens convert" />
          <h2>Convertir</h2>
        </Link>
        <Link to="/application/compress" className="application__btn-link">
          <img src={compress} alt="icon liens compress" />
          <h2>Compresser</h2>
        </Link>
        <Link to="/application/multi-size" className="application__btn-link">
          <img src={photoStack} alt="icon liens multi-size" />
          <h2>Multi-tailles</h2>
        </Link>
      </div>
    </section>
  );
};
