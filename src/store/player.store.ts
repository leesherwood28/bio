import { AnimationClip, Object3D } from 'three';
import create from 'zustand';
import { PhysicsApi } from '../hooks/use-physics-object';

export type PlayerCharacterState =
  | 'running'
  | 'idle'
  | 'walking'
  | 'walking-backwards';

interface PlayerStore {
  playerApi: PhysicsApi<Object3D> | null;
  playerAnimations: AnimationClip[] | null;
  characterState: PlayerCharacterState;
  isPaused: boolean;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setPlayerApi: (api: PhysicsApi<Object3D>) => void;
  setPlayerAnimations: (animations: AnimationClip[]) => void;
  setCharacterState: (state: PlayerCharacterState) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  return {
    playerApi: null,
    playerAnimations: null,
    characterState: 'idle',
    isPaused: false,
    isHidden: false,
    setIsHidden: (isHidden) => set({ isHidden }),
    setIsPaused: (isPaused) => set({ isPaused }),
    setPlayerApi: (api: PhysicsApi<Object3D>) =>
      set((state) => ({ ...state, playerApi: api })),

    setPlayerAnimations: (animations: AnimationClip[]) =>
      set((state) => ({ ...state, playerAnimations: animations })),
    setCharacterState: (state: PlayerCharacterState) =>
      set({ characterState: state }),
  };
});
