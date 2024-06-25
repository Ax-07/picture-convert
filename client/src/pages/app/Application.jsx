import { Convert } from "../app/convert/Convert";
import { Compress } from "../app/compress/Compress";
import { MultiSize } from "../app/multiSize/MultiSize";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../../components/navigation/navbar/Navbar";
import waveTop from "../../assets/svg/WaveTop.svg";

const navData = [
    { id: 1, name: "Accueil", link: "/application" },
    { id: 2, name: "Convert", link: "/application/convert" },
    { id: 3, name: "Compress", link: "/application/compress" },
    { id: 4, name: "Multi Size", link: "/application/multi-size" },
];


export const Application = () => {
  return (
    <>
    <section id="application" className="application">
              <img className="home__container-border" src={waveTop} alt="" />

      <Navbar navData={navData} />
      <div className="application__content">
        <Routes>
          <Route path="*" element={<DefaultMessage />} />
          <Route path="convert" element={<Convert />} />
          <Route path="compress" element={<Compress />} />
          <Route path="multi-size" element={<MultiSize />} />
        </Routes>
      </div>
    </section>
    </>
  );
};

const DefaultMessage = () => {
  return (
    <section>
      <h1>Bienvenue !</h1>
      <p>Veuillez sélectionner une option dans le menu.</p>
    </section>
  );
};
