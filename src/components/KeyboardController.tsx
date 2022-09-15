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
    () => setControls({ backward: true }),
    () => setControls({ backward: false })
  );

  useKeys(
    ['s', 'S', 'ArrowDown'],
    () => setControls({ forward: true }),
    () => setControls({ forward: false })
  );

  return null;
};

function useKeys(
  keys: string[],
  keydownHandler: () => void,
  keyupHandler: () => void
) {
  const keyUpHandler = (event: KeyboardEvent) => {
    if (keys.some((key) => key === event.key)) {
      keydownHandler();
    }
  };
  const keyDownHandler = (event: KeyboardEvent) => {
    if (keys.some((key) => key === event.key)) {
      keyupHandler();
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
