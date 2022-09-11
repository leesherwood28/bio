import create from 'zustand';
import { createRef } from 'react';

const useGameStore = create<{ camera: unknown }>((set, get) => {
  return {
    camera: createRef(),
  };
});
export { useGameStore };
