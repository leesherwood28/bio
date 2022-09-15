import create from 'zustand';
import { createRef, RefObject } from 'react';
import { Group } from 'three';

interface GameState {
  camera: RefObject<Group>;
  player: RefObject<Group>;
  controls: ControllerState;
  setControls: (controls: Partial<ControllerState>) => void;
}

export interface ControllerState {
  forward?: boolean;
  backward?: boolean;
  left?: boolean;
  right?: boolean;
}

const useGameStore = create<GameState>((set, get) => {
  return {
    camera: createRef(),
    player: createRef(),
    controls: {},
    setControls: (controls: Partial<ControllerState>) =>
      set((state) => ({ controls: { ...state.controls, ...controls } })),
  };
});
export { useGameStore };
