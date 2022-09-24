import { PublicApi } from '@react-three/cannon';
import create from 'zustand';

interface PlayerData {
  api: PublicApi | null;
  characterState: PlayerCharacterState;
  setApi: (api: PublicApi) => any;
}

export type PlayerCharacterState = 'running' | 'walking' | 'idle';

const usePlayerData = create<PlayerData>((set, get) => {
  return {
    api: null,
    characterState: 'idle',
    setApi: (api: PublicApi) => set({ api: api }),
  };
});
export { usePlayerData };
