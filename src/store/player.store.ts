import { AnimationClip, Object3D } from 'three';
import create from 'zustand';
import { PhysicsApi } from '../hooks/use-physics-object';
import { RigidBody, RigidBodyApi, RigidBodyApiRef } from '@react-three/rapier';
import { createRef, useRef } from 'react';

export type PlayerCharacterState =
  | 'running'
  | 'idle'
  | 'walking'
  | 'walking-backwards';

interface PlayerStore {
  playerApi: RigidBodyApiRef;
  playerAnimations: AnimationClip[] | null;
  characterState: PlayerCharacterState;
  isPaused: boolean;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setPlayerApi: (api: RigidBodyApiRef) => void;
  setPlayerAnimations: (animations: AnimationClip[]) => void;
  setCharacterState: (state: PlayerCharacterState) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  return {
    playerApi: createRef(),
    playerAnimations: null,
    characterState: 'idle',
    isPaused: false,
    isHidden: false,
    setIsHidden: (isHidden) => set({ isHidden }),
    setIsPaused: (isPaused) => set({ isPaused }),
    setPlayerApi: (api: RigidBodyApiRef) =>
      set((state) => ({ ...state, playerApi: api })),

    setPlayerAnimations: (animations: AnimationClip[]) =>
      set((state) => ({ ...state, playerAnimations: animations })),
    setCharacterState: (state: PlayerCharacterState) =>
      set({ characterState: state }),
  };
});
