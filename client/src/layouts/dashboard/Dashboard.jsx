import { useState } from "react";
import PropTypes from "prop-types";

const imageSizes = [
    {
        titre: "Bannières",
        description: "Les bannières sont des images de grande taille utilisées en haut des pages web ou sur les réseaux sociaux pour capter l'attention. Les tailles optimales pour les bannières sont :\n- Site web : 1920x1080 pixels\n- Facebook : 820x312 pixels\n- Twitter : 1500x500 pixels\n- LinkedIn : 1584x396 pixels\n- YouTube : 2560x1440 pixels (TV), 1546x423 pixels (desktop et smartphone)",
        tailles: {
            mobile: "800x600 pixels",
            tablette: "1200x900 pixels",
            desktop: "1920x1080 pixels"
        }
    },
    {
        titre: "Images de Contenu",
        description: "Les images de contenu sont intégrées dans les articles, blogs et autres publications pour enrichir le texte. Les tailles optimales pour les images de contenu sont :\n- Articles/Blogs : 1200x628 pixels\n- Thumbnails :\n  - Facebook : 1200x628 pixels\n  - Twitter : 1024x512 pixels\n  - LinkedIn : 1200x628 pixels\n  - YouTube : 1280x720 pixels",
        tailles: {
            mobile: "600x315 pixels",
            tablette: "800x420 pixels",
            desktop: "1200x628 pixels"
        }
    },
    {
        titre: "Images de Produit",
        description: "Les images de produit sont utilisées sur les sites e-commerce pour afficher les articles en vente. Les tailles optimales pour les images de produit sont :\n- Image principale : 1000x1000 pixels\n- Vignette : 400x400 pixels",
        tailles: {
            mobile: "400x400 pixels",
            tablette: "800x800 pixels",
            desktop: "1000x1000 pixels"
        }
    },
    {
        titre: "Images de Profil",
        description: "Les images de profil sont utilisées sur les réseaux sociaux et autres plateformes pour identifier les utilisateurs. Les tailles optimales pour les images de profil sont :\n- Facebook : 180x180 pixels\n- Twitter : 400x400 pixels\n- LinkedIn : 400x400 pixels\n- Instagram : 110x110 pixels",
        tailles: {
            mobile: "110x110 pixels",
            tablette: "150x150 pixels",
            desktop: "400x400 pixels"
        }
    },
    {
        titre: "Images de Galerie et Portfolio",
        description: "Les images de galerie et de portfolio sont utilisées pour présenter des collections d'œuvres ou de projets. Les tailles optimales pour ces images sont :\n- Galerie : 1500x1000 pixels\n- Portfolio : 1200x900 pixels",
        tailles: {
            mobile: "600x400 pixels",
            tablette: "900x600 pixels",
            desktop: "1500x1000 pixels"
        }
    },
    {
        titre: "Publicités en Ligne",
        description: "Les publicités en ligne sont des bannières publicitaires affichées sur divers sites web. Les tailles optimales pour ces bannières sont :\n- Google Ads :\n  - Leaderboard : 728x90 pixels\n  - Medium Rectangle : 300x250 pixels\n  - Large Rectangle : 336x280 pixels\n  - Skyscraper : 120x600 pixels",
        tailles: {
            mobile: "300x50 pixels",
            tablette: "468x60 pixels",
            desktop: "728x90 pixels"
        }
    },
    {
        titre: "Autres Images",
        description: "Les favicons sont de petites icônes utilisées dans les onglets de navigateur pour identifier les sites web. Les tailles optimales pour les favicons sont :\n- Favicon : 16x16 pixels, 32x32 pixels, 48x48 pixels",
        tailles: {
            mobile: "16x16 pixels",
            tablette: "32x32 pixels",
            desktop: "48x48 pixels"
        }
    }
];

export const Dashboard = () => {
    const [selectedOption, setSelectedOption] = useState(0);

    return (
        <section className="dashboard">
            <Sidenav options={imageSizes} setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
            <ComponentDisplay option={imageSizes[selectedOption]} />
        </section>
    );
};

const Sidenav = ({ options, setSelectedOption, selectedOption }) => {
    return (
        <nav className="dashboard__sidenav">
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <button
                            onClick={() => setSelectedOption(index)}
                            className={selectedOption === index ? 'active' : ''}
                        >
                            {option.titre}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const ComponentDisplay = ({ option }) => {
    return (
        <div className="dashboard__component-display">
            <h2>{option.titre}</h2>
            <p>{option.description.split('\n').map((item, key) => (
                <span key={key}>{item}<br/></span>
            ))}</p>
            <div className="dashboard__component-display__list">
                <h3>Tailles optimales :</h3>
                <ul>
                    <li>Mobile : {option.tailles.mobile}</li>
                    <li>Tablette : {option.tailles.tablette}</li>
                    <li>Desktop : {option.tailles.desktop}</li>
                </ul>
            </div>
        </div>
    );
};

Sidenav.propTypes = {
    options: PropTypes.array.isRequired,
    selectedOption: PropTypes.number.isRequired,
    setSelectedOption: PropTypes.func.isRequired
};

ComponentDisplay.propTypes = {
    option: PropTypes.object.isRequired
};
