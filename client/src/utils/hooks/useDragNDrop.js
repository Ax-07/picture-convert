import { useCallback, useState } from 'react';

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
  