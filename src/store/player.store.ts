import { RigidBodyApi } from '@react-three/rapier/dist/declarations/src/types';
import { createRef, MutableRefObject } from 'react';
import { AnimationAction, AnimationClip, Group } from 'three';
import create from 'zustand';

export type PlayerCharacterState =
  | 'running'
  | 'idle'
  | 'walking'
  | 'walking-backwards';

type PlayerActions = {
  [x: string]: AnimationAction | null;
};

interface PlayerStore {
  playerApi: MutableRefObject<RigidBodyApi | null>;
  playerObjectRef: MutableRefObject<Group | null>;
  playerActions: PlayerActions;
  characterState: PlayerCharacterState;
  isPaused: boolean;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setPlayerActions: (animations: PlayerActions) => void;
  setCharacterState: (state: PlayerCharacterState) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  return {
    playerApi: createRef(),
    playerObjectRef: createRef(),
    playerActions: {},
    characterState: 'idle',
    isPaused: false,
    isHidden: false,
    setIsHidden: (isHidden) => set({ isHidden }),
    setIsPaused: (isPaused) => set({ isPaused }),
    setPlayerActions: (actions: PlayerActions) =>
      set((state) => ({ ...state, playerActions: actions })),
    setCharacterState: (state: PlayerCharacterState) =>
      set({ characterState: state }),
  };
});
