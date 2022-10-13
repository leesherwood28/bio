import { Vector3 } from 'three';
import create from 'zustand';
import { Input } from '../models/input.model';

interface CameraStore {
  lookAt: Vector3 | null;

  setInput: (input: Partial<Input>) => void;
}

export const useInputStore = create<InputStore>((set, get) => {
  return {
    input: { forward: 0, sideways: 0 },
    setInput: (input: Partial<Input>) =>
      set((state) => ({ ...state, input: { ...state.input, ...input } })),
  };
});
