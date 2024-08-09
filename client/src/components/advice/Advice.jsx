import { useWindowSize } from "../../utils/hooks/useWindowSize";

export const Advice = () => {
  const { windowWidth } = useWindowSize();
  const isDesktop = windowWidth > 1024;

  return (
    <section id="advice" className="advice">
      <h2 className="advice__title">Conseils pour Optimiser vos Images</h2>
      <ul className="advice__list">
        <li className="advice__item">
          <strong>Utilisez des images compressées :</strong> Réduisez la taille
          de vos fichiers d'image sans compromettre la qualité pour améliorer
          les temps de chargement de votre site.
        </li>
        <li className="advice__item">
          <strong>Choisissez le bon format :</strong> Pour le web, les formats
          JPEG, PNG, et WebP sont souvent les plus appropriés. Le format WebP
          est particulièrement performant en termes de compression et de
          qualité.
        </li>
        <li className="advice__item">
          <strong>Choisissez les bonne Dimensions :</strong> Redimensionnez vos
          images pour qu'elles correspondent aux dimensions réelles à l'écran,
          sans utiliser de CSS pour les redimensionner. Cela permet d'éviter le
          chargement d'images plus grandes que nécessaire.
        </li>
        <li className="advice__item">
          <strong>Utilisez des images responsives :</strong> Avec les balises{" "}
          <code>&lt;picture&gt;</code> et les attributs <code>srcset</code> et{" "}
          <code>sizes</code>, vous pouvez fournir différentes versions d'une
          image en fonction de la taille de l'écran.
        </li>
        <li className="advice__item">
          <strong>Prévisualisez vos images :</strong> Avant de les télécharger,
          vérifiez que vos images s'affichent correctement et sont bien
          dimensionnées sur différents appareils.
        </li>
        <li className="advice__item">
          <strong>Nommez vos fichiers de manière descriptive :</strong> Utilisez
          des noms de fichiers qui décrivent le contenu de l'image pour
          améliorer le référencement et l'accessibilité.
        </li>
        <li className="advice__item">
          <strong>Activez le lazy loading :</strong> Utilisez l'attribut{" "}
          <code>loading="lazy"</code> sur les images pour différer le chargement
          des images non critiques jusqu'à ce qu'elles soient nécessaires, ce
          qui améliore les performances de votre site.
        </li>
        <li className="advice__item">
          <strong>Optimisez le texte alternatif (alt text) :</strong> Fournissez
          des descriptions précises et pertinentes pour améliorer
          l'accessibilité et le SEO.
        </li>
        <li className="advice__item">
          <strong>Utilisez des sprites CSS :</strong> Combinez plusieurs petites
          images en une seule pour réduire le nombre de requêtes HTTP et
          améliorer les performances de votre site.
        </li>
      </ul>

      <h2 className="advice__sub-title">Exemple de Code pour Images Responsives</h2>
      <pre>
        {isDesktop ? (
          <code>
            {`
              <picture>
                <source srcset="image-small.jpg" media="(max-width: 600px)"/>
                <source srcset="image-medium.jpg" media="(min-width: 601px) and (max-width: 1024px)"/>
                <source srcset="image-large.jpg" media="(min-width: 1025px)"/>
                <img src="default.jpg" alt="Description de l'image" loading="lazy"/>
              </picture>
            `}
          </code>
        ) : (
          <code>
            {`
              <picture>
                <source 
                  srcset="image-small.jpg" 
                  media="(max-width: 600px)"
                />
                <source 
                  srcset="image-medium.jpg" 
                  media="(min-width: 601px) and (max-width: 1024px)"
                />
                <source 
                  srcset="image-large.jpg" 
                  media="(min-width: 1025px)"
                />
                <img 
                  src="default.jpg" 
                  alt="Description de l'image" 
                  loading="lazy"
                />
              </picture>
            `}
          </code>
        )}
      </pre>
    </section>
  );
};
