import PropTypes from "prop-types";
import cloudUpload from "../../assets/svg/faCloudArrowUp.svg";
import sliders from '../../assets/svg/faSliders.svg';
import download from '../../assets/svg/faDownload.svg';

export const HowItWorks = () => {
    return (
      <section id="how-it-works" className="how-it-works">
        <h2 className="how-it-works__title">Comment ça marche ?</h2>
        <div className="step__list">
          <Step
            title="Importez une image"
            description="Sélectionnez une image que vous souhaitez optimiser depuis votre appareil."
            icon={cloudUpload}
          />
          <Step
            title="Choisissez les options"
            description="Sélectionnez les options de conversion, compression ou de redimensionnement."
            icon={sliders}
          />
          <Step
            title="Téléchargez vos images"
            description="Récupérez vos images optimisées prêtes à être utilisées sur votre site web."
            icon={download}
          />
        </div>
      </section>
    );
};

const Step = ({ title, description, icon }) => {
    return (
      <div className="step">
        <img src={icon} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
};

Step.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
};
