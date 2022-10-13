import { AnimationClip, Object3D } from 'three';
import create from 'zustand';
import { PhysicsApi } from '../hooks/use-physics-object';

interface PlayerStore {
  playerApi: PhysicsApi<Object3D> | null;
  playerAnimations: AnimationClip[] | null;
  setPlayerApi: (api: PhysicsApi<Object3D>) => void;
  setPlayerAnimations: (animations: AnimationClip[]) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  return {
    playerApi: null,
    playerAnimations: null,
    setPlayerApi: (api: PhysicsApi<Object3D>) =>
      set((state) => ({ ...state, playerApi: api })),

    setPlayerAnimations: (animations: AnimationClip[]) =>
      set((state) => ({ ...state, playerAnimations: animations })),
  };
});
