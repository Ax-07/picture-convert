import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { Header } from "./layouts/header/Header.jsx";
import { Footer } from "./layouts/footer/Footer.jsx";
import { Convert } from "./pages/app/convert/Convert.jsx";
import { Compress } from "./pages/app/compress/Compress.jsx";
import { MultiSize } from "./pages/app/multiSize/MultiSize.jsx";
import { PictureProvider } from "./context/PicturesContext.jsx";
import { useScrollToHashElement, useScrollToTop } from "./utils/hooks/useScrollToHashElement.js";
import { Application } from "./pages/app/Application.jsx";

function App() {
  useScrollToHashElement();
  useScrollToTop();
  return (
    <PictureProvider>
      <Header data-testid='header'/>
      <main data-testid='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/application/*" element={<Application/>}/>
          <Route path="/convert" element={<Convert />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/multi-size" element={<MultiSize />} />
        </Routes>
      </main>
      <Footer/>
    </PictureProvider>
  );
}

export default App;
