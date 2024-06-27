import { Link } from "react-router-dom";
import { Convert } from "../app/convert/Convert";
import { Compress } from "../app/compress/Compress";
import { MultiSize } from "../app/multiSize/MultiSize";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../../components/navigation/navbar/Navbar";
import waveTop from "../../assets/svg/WaveTop.svg";
import { SeparateLine } from "../../components/separateLines/SeparateLine";
import refresh from "../../assets/svg/faRefresh.svg";
import compress from "../../assets/svg/faCompressArrowsAlt.svg";
import photoStack from '../../assets/svg/photo.stack.svg';

const navData = [
    { id: 1, name: "Accueil", link: "/application" },
    { id: 2, name: "Convertir", link: "/application/convert" },
    { id: 3, name: "Compresser", link: "/application/compress" },
    { id: 4, name: "Multi-Size", link: "/application/multi-size" },
];


export const Application = () => {
  return (
    <>
    <section id="application" className="application">
      <img className="home__container-border" src={waveTop} alt="" />
      <br />
      <Navbar navData={navData} direction={"row"}/>
      <SeparateLine />
      
        <Routes>
          <Route path="*" element={<DefaultMessage />} />
          <Route path="convert" element={<Convert />} />
          <Route path="compress" element={<Compress />} />
          <Route path="multi-size" element={<MultiSize />} />
        </Routes>
    </section>
    </>
  );
};

const DefaultMessage = () => {
  return (
    <section>
      <h1>Bienvenue !</h1>
      <p>Veuillez sélectionner une option dans le menu.</p>
      <div className="application__list">
      <Link to='/application/convert' className='application__btn-link'>
        <img src={refresh} alt="icon liens convert" />
        <h2>Convertir</h2>
      </Link>
      <Link to='/application/compress' className='application__btn-link'>
        <img src={compress} alt="icon liens compress" />
        <h2>Compresser</h2>
      </Link>
      <Link to='/application/multi-size' className='application__btn-link'>
        <img src={photoStack} alt="icon liens multi-size" />
        <h2>Multi-tailles</h2>
      </Link></div>
    </section>
  );
};
