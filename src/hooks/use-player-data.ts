import { PublicApi } from '@react-three/cannon';
import create from 'zustand';

interface PlayerData {
  api: PublicApi | null;
  characterState: PlayerCharacterState;
  setApi: (api: PublicApi) => void;
  setCharacterState: (state: PlayerCharacterState) => void;
}

export type PlayerCharacterState = 'running' | 'idle';

const usePlayerData = create<PlayerData>((set, get) => {
  return {
    api: null,
    characterState: 'idle',
    setApi: (api: PublicApi) => set({ api: api }),
    setCharacterState: (state: PlayerCharacterState) =>
      set({ characterState: state }),
  };
});
export { usePlayerData };
