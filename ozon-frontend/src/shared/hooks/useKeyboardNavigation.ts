import { useRef, KeyboardEvent } from 'react';

type InputElement = HTMLInputElement | HTMLSelectElement;

export const useKeyboardNavigation = (onEnter?: () => void, onEscape?: () => void) => {
  const inputsRef = useRef<InputElement[]>([]);

  const handleKeyDown = (e: KeyboardEvent<InputElement>, index: number) => {
    switch (e.key) {
      case 'Enter':
        onEnter?.();
        break;
      case 'Escape':
        onEscape?.();
        break;
      case 'ArrowRight':
        if (index < inputsRef.current.length - 1) {
          inputsRef.current[index + 1]?.focus();
        }
        break;
      case 'ArrowLeft':
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
        break;
    }
  };

  return { inputsRef, handleKeyDown };
};
