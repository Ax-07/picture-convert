export const StepByStep = () => {
  return (
    <div className="stepByStep" data-testid='stepByStep'>
      <h2 className="stepByStep__title" data-testid="title">Comment ça marche ?</h2>
      <ol className="stepByStep__list" data-testid='list'>
        <li className="stepByStep__item" role='listitem'>Sélectionnez une image.</li>
        <li className="stepByStep__item" role='listitem'>Régler les options.</li>
        <li className="stepByStep__item" role='listitem'>Convertissez au format WebP.</li>
        <li className="stepByStep__item" role='listitem'>Téléchargez.</li>
      </ol>
    </div>
  );
};
