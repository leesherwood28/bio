import { useEffect } from 'react';
import { useGameStore } from '../state/game-store';

const KeyboardController: React.FunctionComponent = () => {
  const setControls = useGameStore((s) => s.setControls);

  useKeys(
    ['a', 'A', 'ArrowLeft'],
    () => setControls({ left: true }),
    () => setControls({ left: false })
  );

  useKeys(
    ['d', 'D', 'ArrowRight'],
    () => setControls({ right: true }),
    () => setControls({ right: false })
  );

  useKeys(
    ['w', 'W', 'ArrowUp'],
    () => setControls({ forward: true }),
    () => setControls({ forward: false })
  );

  useKeys(
    ['s', 'S', 'ArrowDown'],
    () => setControls({ backward: true }),
    () => setControls({ backward: false })
  );

  return null;
};

function useKeys(keys: string[], keydown: () => void, keyup: () => void) {
  const keyUpHandler = (event: KeyboardEvent) => {
    if (keys.some((key) => key === event.key)) {
      keyup();
    }
  };
  const keyDownHandler = (event: KeyboardEvent) => {
    if (keys.some((key) => key === event.key)) {
      keydown();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [keys, keyDownHandler, keyUpHandler]);
}

export default KeyboardController;
