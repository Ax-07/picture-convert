import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { Header } from "./layouts/header/Header.jsx";
import { Footer } from "./layouts/footer/Footer.jsx";
import { Convert } from "./pages/convert/Convert.jsx";
import { Compress } from "./pages/compress/Compress.jsx";
import { MultiSize } from "./pages/multiSize/MultiSize.jsx";
import { PointAnimation } from "./components/pointAnimation/PointAnimation.jsx";
import {Guide} from "./pages/guide/Guide.jsx";

function App() {
  return (
    <>
      <Header data-testid='header'/>
      <main data-testid='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/multi-size" element={<MultiSize />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
        <PointAnimation />
      </main>
      <Footer/>
    </>
  );
}

export default App;
