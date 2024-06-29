import PropTypes from "prop-types";
import { icons } from "../../assets/icons/icons";

export const About = () => {
  const features = [
    {
      title: "Facilité d’utilisation",
      description: "Une interface intuitive qui vous permet de convertir, compresser et redimensionner vos images en quelques clics.",
      icon: icons.cursorArrow,
    },
    {
      title: "Qualité optimale",
      description: "Des algorithmes avancés qui garantissent une qualité optimale pour vos images, même après compression.",
      icon: icons.faStar,
    },
    {
      title: "Formats multiples",
      description: "Support de plusieurs formats d'image, y compris JPG, PNG et le performant WebP.",
      icon: icons.photoStack,
    },
    {
      title: "Optimisation pour le web",
      description: "Réduisez les temps de chargement de vos pages web et améliorez l'expérience utilisateur.",
      icon: icons.gaugeOpen,
    },
    // {
    //   title: "Gain de temps",
    //   description: "Traitez plusieurs images en même temps grâce à notre fonctionnalité de traitement par lots.",
    //   icon: icons.figureWalk,
    // },
  ];

  return (
    <section id="about" className="about">
        <h2 className="about__title">Pourquoi utiliser Picture Convert?</h2>
        <p className="about__description">
          <strong>Picture convert</strong> est conçu pour vous offrir une solution simple, rapide et efficace pour gérer vos images en ligne. Voici pourquoi vous devriez choisir notre application :
        </p>
        <ul className="about__features-list">
          {features.map((feature, index) => (
            <li key={index} className="about__features-item">
              <Feature
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </li>
          ))}
        </ul>
        <p className="about__description">
          <strong>Conclusion :</strong> Picture Convert est une solution complète pour gérer vos images en ligne. Elle vous permet de convertir, compresser et redimensionner vos images avec facilité, tout en garantissant une qualité optimale et des performances web améliorées.
        </p>
    </section>
  );
};

const Feature = ({ title, description, icon }) => {
  return (
    <div className="feature">
      <img className="feature__icon" src={icon} alt={`icon ${title}`} />
      <div className="feature__content">
        <h3 className="feature__title">{title}</h3>
        <p className="feature__description">{description}</p>
      </div>
    </div>
  );
};

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
