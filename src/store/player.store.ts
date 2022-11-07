import { RigidBodyApi } from '@react-three/rapier/dist/declarations/src/types';
import { createRef, MutableRefObject } from 'react';
import { AnimationClip, Group } from 'three';
import create from 'zustand';

export type PlayerCharacterState =
  | 'running'
  | 'idle'
  | 'walking'
  | 'walking-backwards';

interface PlayerStore {
  playerApi: MutableRefObject<RigidBodyApi | null>;
  playerObjectRef: MutableRefObject<Group | null>;
  playerAnimations: AnimationClip[] | null;
  characterState: PlayerCharacterState;
  isPaused: boolean;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setPlayerAnimations: (animations: AnimationClip[]) => void;
  setCharacterState: (state: PlayerCharacterState) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  return {
    playerApi: createRef(),
    playerObjectRef: createRef(),
    playerAnimations: null,
    characterState: 'idle',
    isPaused: false,
    isHidden: false,
    setIsHidden: (isHidden) => set({ isHidden }),
    setIsPaused: (isPaused) => set({ isPaused }),
    setPlayerAnimations: (animations: AnimationClip[]) =>
      set((state) => ({ ...state, playerAnimations: animations })),
    setCharacterState: (state: PlayerCharacterState) =>
      set({ characterState: state }),
  };
});
