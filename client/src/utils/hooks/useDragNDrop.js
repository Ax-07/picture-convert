import { useCallback, useState } from 'react';

/**
 * @description - Un hook personnalisé pour gérer les événements de glissement et de dépose de fichier.
 * @returns {object} - Renvoie un objet contenant :
 *  dragging - Un booléen indiquant si un fichier est en cours de glissement.
 * dragOver - Une fonction pour gérer l'événement de survol.
 * dragEnter - Une fonction pour gérer l'événement d'entrée.
 * dragLeave - Une fonction pour gérer l'événement de sortie.
 * fileDrop - Une fonction pour gérer l'événement de dépose de fichier.
 */

export const useDragNDrop = () => {
    const [dragging, setDragging] = useState(false);

    const dragOver = useCallback((e) => {
      e.preventDefault();
      setDragging(true);
    }, []);
  
    const dragEnter = useCallback((e) => {
      e.preventDefault();
      setDragging(true);
    }, []);
  
    const dragLeave = useCallback((e) => {
      e.preventDefault();
      setDragging(false);
    }, []);
  
    const fileDrop = useCallback((e) => {
      e.preventDefault();
      setDragging(false);
      const files = e.dataTransfer.files;
      return files;
    }, []);
  
    return {
      dragging,
      dragOver,
      dragEnter,
      dragLeave,
      fileDrop,
    };
  };
  