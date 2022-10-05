import produce from 'immer';
import create from 'zustand';
import { isNil } from '../functions/is-nil.fn';
import { PhysicalObject } from '../models/physical-object.model';

interface PhysicsStore {
  objects: PhysicalObject[];
  addObject: (object: PhysicalObject) => void;
  setObject: (objectId: string, setFn: (value: PhysicalObject) => void) => void;
}

export const usePhysicsStore = create<PhysicsStore>((set, get) => {
  return {
    objects: [],
    addObject: (object: PhysicalObject) =>
      set(
        produce<PhysicsStore>((state) => {
          state.objects.push(object);
        })
      ),
    setObject: (objectId: string, setFn: (value: PhysicalObject) => void) =>
      set(
        produce<PhysicsStore>((state) => {
          const object = state.objects.find((o) => o.id === objectId);
          if (isNil(object)) {
            return;
          }
          setFn(object);
        })
      ),
  };
});
