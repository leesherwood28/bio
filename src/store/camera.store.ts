import { Vector3 } from 'three';
import create, { StoreApi } from 'zustand';

interface CameraStore {
  idealLookAt: Vector3 | null;
  idealPosition: Vector3 | null;
  set: StoreApi<CameraStore>['setState'];
}

export const useCameraStore = create<CameraStore>((set) => {
  return {
    idealLookAt: null,
    idealPosition: null,
    set,
  };
});
