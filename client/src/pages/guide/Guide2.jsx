import { Dashboard } from "../../layouts/dashboard/Dashboard";

export const Guide2 = () => {
  
      return (
        <section className="guide-section">
          <div className="container">
            <h2>Dimensions Recommandées</h2>
            <Dashboard />
            <h2>Conseils pour Optimiser vos Images</h2>
            <ul>
              <li>
                <strong>Utilisez des images compressées :</strong> Réduisez la
                taille de vos fichiers d'image sans compromettre la qualité pour
                améliorer les temps de chargement de votre site.
              </li>
              <li>
                <strong>Choisissez le bon format :</strong> Pour le web, les
                formats JPEG, PNG, et WebP sont souvent les plus appropriés. Le
                format WebP est particulièrement performant en termes de
                compression et de qualité.
              </li>
              <li>
                <strong>Utilisez des images responsives :</strong> Avec les
                balises <code>&lt;picture&gt;</code> et les attributs{" "}
                <code>srcset</code> et <code>sizes</code>, vous pouvez fournir
                différentes versions d'une image en fonction de la taille de
                l'écran.
              </li>
              <li>
                <strong>Prévisualisez vos images :</strong> Avant de les
                télécharger, vérifiez que vos images s'affichent correctement et
                sont bien dimensionnées sur différents appareils.
              </li>
              <li>
                <strong>Nommez vos fichiers de manière descriptive :</strong>{" "}
                Utilisez des noms de fichiers qui décrivent le contenu de
                l'image pour améliorer le référencement et l'accessibilité.
              </li>
            </ul>

            <h2>Exemple de Code pour Images Responsives</h2>
            <pre>
              <code>
                {`
    <picture>
      <source srcset="image-small.jpg" media="(max-width: 600px)">
      <source srcset="image-medium.jpg" media="(min-width: 601px) and (max-width: 1024px)">
      <source srcset="image-large.jpg" media="(min-width: 1025px)">
      <img src="default.jpg" alt="Description de l'image">
    </picture>
    `}
              </code>
            </pre>

            {/* <h2>Questions Fréquentes</h2>
            <div className="faq">
              <h3>
                Q : Quelle est la meilleure résolution pour les images sur
                mobile ?
              </h3>
              <p>
                R : Pour les mobiles, une largeur de 320px est généralement
                suffisante. Assurez-vous que les images sont compressées et
                optimisées pour un chargement rapide.
              </p>

              <h3>
                Q : Dois-je utiliser des images de haute résolution pour les
                desktops ?
              </h3>
              <p>
                R : Oui, pour les desktops, utilisez des images avec une largeur
                d'au moins 1024px pour une meilleure qualité d'affichage.
              </p>

              <h3>
                Q : Comment puis-je compresser mes images sans perdre de qualité
                ?
              </h3>
              <p>
                R : Utilisez des outils de compression comme TinyPNG, JPEG
                Optimizer, ou d'autres outils en ligne qui permettent de réduire
                la taille des fichiers tout en maintenant une bonne qualité
                d'image.
              </p> 
            </div>*/}
          </div>
        </section>
      );
    }

