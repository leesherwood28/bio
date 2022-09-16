import create from 'zustand';
import { createRef, RefObject } from 'react';
import { AnimationAction, Group } from 'three';

interface GameState {
  camera: RefObject<Group>;
  player: PlayerData;
  controls: ControllerState;
  set: (
    partial:
      | GameState
      | Partial<GameState>
      | ((state: GameState) => GameState | Partial<GameState>),
    replace?: boolean | undefined
  ) => void;
}

export interface ControllerState {
  forward?: boolean;
  backward?: boolean;
  left?: boolean;
  right?: boolean;
}

type PlayerState = 'running' | 'walking' | 'idle';

interface PlayerData {
  object: RefObject<Group>;
  state: PlayerState;
  animation: AnimationAction | null;
  animations: {
    [x: string]: AnimationAction | null;
  } | null;
}

const useGameStore = create<GameState>((set, get) => {
  return {
    set,
    camera: createRef(),
    player: {
      object: createRef(),
      state: 'idle',
      animation: null,
      animations: null,
    },
    controls: {},
  };
});
export { useGameStore };
