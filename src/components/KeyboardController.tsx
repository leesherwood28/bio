import { useEffect } from 'react';
import { useGameStore } from '../state/game-store';

const KeyboardController: React.FunctionComponent = () => {
  const set = useGameStore((s) => s.set);

  useKeys(
    ['a', 'A', 'ArrowLeft'],
    () => set((s) => ({ controls: { ...s.controls, left: true } })),
    () => set((s) => ({ controls: { ...s.controls, left: false } }))
  );

  useKeys(
    ['d', 'D', 'ArrowRight'],
    () => set((s) => ({ controls: { ...s.controls, right: true } })),
    () => set((s) => ({ controls: { ...s.controls, right: false } }))
  );

  useKeys(
    ['w', 'W', 'ArrowUp'],
    () => set((s) => ({ controls: { ...s.controls, forward: true } })),
    () => set((s) => ({ controls: { ...s.controls, forward: false } }))
  );

  useKeys(
    ['s', 'S', 'ArrowDown'],
    () => set((s) => ({ controls: { ...s.controls, backward: true } })),
    () => set((s) => ({ controls: { ...s.controls, backward: false } }))
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
