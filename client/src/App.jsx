import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { Header } from "./layouts/header/Header.jsx";
import { Footer } from "./layouts/footer/Footer.jsx";
import { Convert } from "./pages/convert/Convert.jsx";
import { Compress } from "./pages/compress/Compress.jsx";
import { MultiSize } from "./pages/multiSize/MultiSize.jsx";
import { PointAnimation } from "./components/pointAnimation/PointAnimation.jsx";
import { PictureProvider } from "./context/PicturesContext.jsx";
import { Guide2 } from "./pages/guide/Guide2.jsx";
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <PictureProvider>
      <Header data-testid='header'/>
      <main data-testid='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/multi-size" element={<MultiSize />} />
          <Route path="/guide" element={<Guide2 />} />
        </Routes>
        <PointAnimation />
      </main>
      <Footer/>
      <Analytics/>
    </PictureProvider>
  );
}

export default App;
