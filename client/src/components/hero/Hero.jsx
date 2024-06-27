import { NavLink } from "react-router-dom";
import { BtnStart } from "../btn/Buttons";
import mockup from "../../assets/images/hero-mockup.webp";

export const Hero = () => {
    return (
      <section className="hero">
        <picture className="hero__bg-image">
          <source srcSet="/hero_picture/mobile-unsplash_y2azHvupCVo.webp" media="(max-width: 600px)" />
          <source srcSet="/hero_picture/tablet-unsplash_y2azHvupCVo.webp" media="(min-width: 601px) and (max-width: 1024px)" />
          <source srcSet="/hero_picture/desktop-unsplash_y2azHvupCVo.webp" media="(min-width: 1025px)" />
          <img src="/hero_picture/desktop-unsplash_y2azHvupCVo.webp" alt="photo d'un paysage de montagne au dessus des nuages" />
        </picture>
        <div className="hero__mask"></div>
        <div className="hero__column hero__column-left">
        <div className="hero__content">
          <h2>Convertissez, Compressez et Redimensionnez Vos Images Facilement</h2>
          <p>
            Picture Convert vous permet de convertir, compresser et redimensionner
            vos images en toute simplicité. Que vous travailliez avec des graphismes professionnels ou des photos personnelles, nous avons tout ce qu'il vous faut.
          </p>
          <div className="hero__cta">
            <NavLink to="/#how-it-works" className="hero__link btn">En savoir plus</NavLink>
            <BtnStart />
          </div>
        </div>
        </div>
        <div className="hero__column hero__column-right">
          <img className="hero__img" src={mockup} alt="illustration de l'application" />
        </div>
      </section>
    );
  };