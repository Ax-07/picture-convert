export const Guide = () => {
  return (
    <article className="guide" data-testid="guide">
      <header className="guide__header" role="heading-guide">
        <h1 className="guide__title" role="heading-guide-title">
          Comment choisir les bonnes dimensions d'image pour votre site web ?
        </h1>
        <p className="guide__desc" role="guide-intro">
          Lorsque vous créez un site web, choisir les bonnes dimensions d'image
          est crucial pour garantir une expérience utilisateur optimale sur une
          variété d'appareils, allant des smartphones aux tablettes en passant
          par les ordinateurs de bureau. Voici quelques conseils pour vous aider
          à prendre les bonnes décisions.
        </p>
      </header>
      <section>
        <h2 className="guide__sub-title" role="section-title">Smartphones</h2>
        <p className="guide__desc" role="section-description">
          Les smartphones ont des résolutions variées, des standard aux haut de
          gamme. Pour les résolutions standard comme 720p ou 1080p, optez pour
          des images de 360px à 540px de largeur. Pour les résolutions plus
          élevées comme 1440p ou 4K, envisagez des images de 720px à 1080px de
          largeur.
        </p>
        <ul className="guide__list" role="liste">
          <li className="guide__item" role="liste-item">
            Pour les smartphones avec des résolutions standard, telles que 720p
            (1280x720) ou 1080p (1920x1080), optez pour des images d'environ
            360px à 540px de largeur.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les smartphones haut de gamme avec des résolutions plus
            élevées, comme 1440p (2560x1440) ou même 4K (3840x2160), envisagez
            des images de 720px à 1080px de largeur.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les images en pleine largeur : 640 à 750 pixels de largeur, en
            fonction des résolutions d'écran les plus courantes.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les images dans le contenu : 320 à 600 pixels de largeur, en
            fonction de la mise en page et de la densité de contenu.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les vignettes (thumbnails) : 100px à 200px de largeur.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les avatars d'utilisateurs : 100 à 200 pixels de largeur, selon
            l'emplacement et le style.
          </li>
        </ul>
      </section>
      <section>
        <h2 className="guide__sub-title" role="section-title">Tablettes</h2>
        <p className="guide__desc" role="section-description">
          Les tablettes offrent une expérience visuelle différente. Pour les
          résolutions standard comme 768p ou 1080p, des images de 384px à 540px
          de largeur peuvent suffire. Pour les résolutions plus élevées comme
          1536p ou 2K, envisagez des images de 768px à 1080px de largeur.
        </p>
        <ul className="guide__list" role="liste">
          <li className="guide__item" role="liste-item">
            Pour les tablettes avec des résolutions standard, comme 768p
            (1024x768) ou 1080p (1920x1080), des images d'environ 384px à 540px
            de largeur peuvent convenir.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les tablettes haut de gamme avec des résolutions plus élevées,
            comme 1536p (2048x1536) ou 2K (2560x1600), des images de 768px à
            1080px de largeur peuvent être plus adaptées.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les images en pleine largeur : 640 à 750 pixels de largeur, en
            fonction des résolutions d'écran les plus courantes.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les images dans le contenu : 320 à 600 pixels de largeur, en
            fonction de la mise en page et de la densité de contenu.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les vignettes (thumbnails) : 100px à 200px de largeur.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les blockquote illustrés : 600 à 800 pixels de largeur, en
            fonction de la mise en page.
          </li>
        </ul>
      </section>
      <section>
        <h2 className="guide__sub-title" role="section-title">Écrans haute résolution</h2>
        <p className="guide__desc" role="section-description">
          Les appareils avec des écrans haute résolution, tels que les
          smartphones et les tablettes avec des écrans Retina ou équivalents,
          nécessitent des images de résolution plus élevée pour assurer une
          netteté optimale. Utilisez des images avec une résolution double par
          rapport à la taille physique de l'écran. Par exemple, pour un écran de
          1920x1080, des images de 3840x2160 offriront une qualité optimale.
        </p>
        <ul className="guide__list" role="liste">
          <li className="guide__item" role="liste-item">
            Pour les images en pleine largeur (comme les bannières) : 1920
            pixels de largeur.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les images dans le contenu : 1200 à 1600 pixels de largeur, en
            fonction de la mise en page et de la densité de contenu.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les vignettes (thumbnails) : 100px à 200px de largeur.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les blockquote illustrés : 600 à 800 pixels de largeur, en
            fonction de la mise en page.
          </li>
          <li className="guide__item" role="liste-item">
            Pour les figures (images accompagnées de légendes) : 400 à 800
            pixels de largeur, en fonction de la mise en page.
          </li>
        </ul>
      </section>
      <section>
        <h2 className="guide__sub-title" role="section-title">Densité de pixels et format WebP</h2>
        <p className="guide__desc" role="section-description">
          Les appareils modernes, comme les smartphones et les tablettes,
          disposent souvent d'écrans haute densité de pixels. Utilisez des
          images double ou quadruple résolution (2x ou 4x) pour garantir une
          netteté optimale. De plus, le format WebP offre une compression
          supérieure tout en préservant la qualité visuelle, ce qui accélère le
          chargement des pages et améliore les performances globales du site
          web.
        </p>
      </section>
      <section>
        <h2 className="guide__sub-title" role="section-title">Accessibilité, SEO et adaptabilité</h2>
        <p className="guide__desc" role="section-description">
          Assurez-vous d'inclure des attributs alt descriptifs pour toutes vos
          images afin d'améliorer l'accessibilité et le référencement SEO de
          votre site. De plus, avec la conception réactive, fournissez des
          images adaptatives qui s'ajustent dynamiquement en fonction de la
          taille et de la résolution de l'écran de l'utilisateur.
        </p>
      </section>
      <section>
        <h2 className="guide__sub-title" role="section-title">Adaptabilité</h2>
        <p className="guide__desc" role="section-description">
          Avec l'avènement des écrans haute résolution et de la conception
          réactive, il est essentiel de fournir des images adaptatives qui
          s'ajustent dynamiquement en fonction de la taille et de la résolution
          de l'écran de l'appareil de l'utilisateur. Utilisez des techniques
          telles que les images SVG pour les graphiques vectoriels et les
          techniques de redimensionnement côté serveur pour fournir
          automatiquement la meilleure taille d'image possible en fonction de la
          demande. Il est également recommandé d'utiliser des images adaptatives
          (srcset) pour fournir des versions d'images optimisées pour différents
          dispositifs et résolutions d'écran. Cela permettra de réduire la
          taille des fichiers téléchargés et d'améliorer les performances
          globales du site web.
        </p>
      </section>
      <section>
        <h2 className="guide__sub-title" role="section-title">Taille des fichiers</h2>
        <p className="guide__desc" role="section-description">
          En plus des dimensions physiques, la taille des fichiers est
          importante. Optimisez la taille des fichiers en utilisant une
          compression efficace tout en maintenant une qualité visuelle
          acceptable pour éviter un impact négatif sur le référencement SEO et
          l'expérience utilisateur.
        </p>
      </section>
    </article>
  );
};
