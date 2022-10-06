import { RefObject, useEffect, useRef } from 'react';
import { Object3D, Vector3 } from 'three';
import { generateUUID } from 'three/src/math/MathUtils';
import { PhysicalObject } from '../models/physical-object.model';
import { usePhysicsStore } from '../store/physics.store';

export interface PhysicsApi<T extends Object3D> {
  setVelocity: (velocity: Vector3) => void;
  setAngularVelocity: (velocity: Vector3) => void;
  getVelocity: () => Vector3;
  getAngularVelocity: () => Vector3;
  objectRef: RefObject<T>;
}

export const usePhysicsObject = <T extends Object3D>(
  radius: number
): PhysicsApi<T> => {
  const id = useRef<string>(generateUUID());

  const { addObject, setObject, getObject } = usePhysicsStore();

  const objectRef = useRef<PhysicalObject>({
    id: id.current,
    angularVelocity: new Vector3(0, 0, 0),
    objectRef: useRef<T>(new Object3D() as T),
    radius: radius,
    velocity: new Vector3(0, 0, 0),
  });

  useEffect(() => {
    addObject(objectRef.current);
  }, []);

  const apiRef = useRef<PhysicsApi<T>>({
    setAngularVelocity: (v) =>
      setObject(id.current, (s) => (s.angularVelocity = v)),
    setVelocity: (v) => setObject(id.current, (s) => (s.velocity = v)),
    getVelocity: () => getObject(id.current)?.velocity ?? new Vector3(),
    getAngularVelocity: () =>
      (getObject(id.current) ?? objectRef.current).velocity,
    objectRef: (getObject(id.current) ?? objectRef.current)
      .objectRef as RefObject<T>,
  });

  return apiRef.current;
};
