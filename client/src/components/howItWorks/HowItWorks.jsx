import PropTypes from "prop-types";
import { icons } from "../../assets/icons/icons";

export const HowItWorks = () => {
    return (
      <section id="how-it-works" className="how-it-works">
        <h2>Comment ça marche ?</h2>
        <div className="step__list">
          <Step
            title="Importez une image"
            description="Sélectionnez une image que vous souhaitez optimiser depuis votre appareil."
            icon={icons.cloudUpload}
          />
          <Step
            title="Choisissez les options"
            description="Sélectionnez les options de conversion, compression ou de redimensionnement."
            icon={icons.sliders}
          />
          <Step
            title="Téléchargez vos images"
            description="Récupérez vos images optimisées prêtes à être utilisées sur votre site web."
            icon={icons.download}
          />
        </div>
      </section>
    );
};

const Step = ({ title, description, icon }) => {
    return (
      <div className="step">
        {icon}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
};

Step.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};
