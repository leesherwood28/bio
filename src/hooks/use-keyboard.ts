import { useCallback, useEffect, useState } from 'react';
import { ControllerInput } from '../models/controller-input.model';

function actionByKey(key: string) {
  const keyActionMap: { [key in string]: keyof ControllerInput } = {
    w: 'moveForward',
    W: 'moveForward',
    ArrowUp: 'moveForward',
    a: 'moveLeft',
    A: 'moveLeft',
    ArrowLeft: 'moveLeft',
    s: 'moveBackward',
    S: 'moveBackward',
    ArrowDown: 'moveBackward',
    d: 'moveRight',
    D: 'moveRight',
    ArrowRight: 'moveRight',
  };
  return keyActionMap[key];
}

export const useKeyboard = () => {
  const [actions, setActions] = useState<ControllerInput>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.key);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.key);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
