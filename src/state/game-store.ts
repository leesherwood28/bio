import create from 'zustand';
import { createRef, RefObject } from 'react';
import { AnimationAction, Group, Vector, Vector3 } from 'three';
import { PublicApi } from '@react-three/cannon';
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
  ref: RefObject<Group> | null;
  api: PublicApi | null;
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
      ref: null,
      api: null,
      state: 'idle',
      animation: null,
      animations: null,
      velocity: new Vector3(0, 0, 0),
    },
    controls: {},
  };
});
export { useGameStore };
