import { NavLink } from "react-router-dom";
import { BtnStart } from "../btn/Buttons";

export const Hero = () => {
    return (
      <section className="hero">
        <picture className="hero__bg-image">
          <source srcSet="/hero_picture/mobile-unsplash_y2azHvupCVo.webp" media="(max-width: 600px)" />
          <source srcSet="/hero_picture/tablet-unsplash_y2azHvupCVo.webp" media="(min-width: 601px) and (max-width: 1024px)" />
          <source srcSet="/hero_picture/desktop-unsplash_y2azHvupCVo.webp" media="(min-width: 1025px)" />
          <img src="/hero_picture/desktop-unsplash_y2azHvupCVo.webp" alt="" />
        </picture>
        <div className="hero__column">
        <div className="hero__content">
          <h2>Convertissez, Compressez et Redimensionnez Vos Images Facilement</h2>
          <p>
            Picture Convert vous permet de convertir, compresser et redimensionner
            vos images en toute simplicité. Que vous travailliez avec des graphismes professionnels ou des photos personnelles, nous avons tout ce qu'il vous faut.
          </p>
          <div className="hero__cta">
            <BtnStart />
            <NavLink to="/#features" className="hero__link btn">En savoir plus</NavLink>
          </div>
        </div>
        </div>
        <div className="hero__column">
          <img className="hero__img" src="/src/assets/images/hero-mockup.png" alt="" />
        </div>
      </section>
    );
  };