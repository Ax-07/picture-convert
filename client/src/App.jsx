import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { Header } from "./layouts/header/Header.jsx";
import { Footer } from "./layouts/footer/Footer.jsx";
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
        </Routes>
      </main>
      <Footer/>
    </PictureProvider>
  );
}

export default App;
