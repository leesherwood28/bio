import { useFrame } from '@react-three/fiber';
import {
  createRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { Euler, Object3D, Quaternion, Vector3 } from 'three';

export interface PhysicsApi<T extends Object3D> {
  setVelocity: (velocity: Vector3) => void;
  setAngularVelocity: (velocity: Vector3) => void;
  getVelocity: () => Vector3;
  getAngularVelocity: () => Vector3;
  objectRef: RefObject<T>;
}

export const usePhysicsObject = <T extends Object3D>(): PhysicsApi<T> => {
  const velocity = useRef<Vector3>(new Vector3(1, 1, 1));
  const angularVelocity = useRef<Vector3>(new Vector3());

  const objectRef = useRef<T>(new Object3D() as T);

  const api: PhysicsApi<T> = {
    setAngularVelocity: (v) => (angularVelocity.current = v),
    setVelocity: (v) => (velocity.current = v),
    getVelocity: () => velocity.current,
    getAngularVelocity: () => angularVelocity.current,
    objectRef: objectRef,
  };

  useFrame((state, elapsedTime) => {
    if (!objectRef.current) {
      return;
    }

    objectRef.current.position.add(
      velocity.current.clone().multiplyScalar(elapsedTime)
    );
    const rotationEuler = new Euler(
      ...angularVelocity.current.clone().multiplyScalar(elapsedTime).toArray()
    );
    objectRef.current.applyQuaternion(
      new Quaternion().setFromEuler(rotationEuler)
    );
  });

  return api;
};
