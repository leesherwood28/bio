import { useFrame } from '@react-three/fiber';
import { createRef, MutableRefObject, RefObject, useRef } from 'react';
import { Euler, Object3D, Quaternion, Vector3 } from 'three';

export interface PhysicsApi {
  setVelocity: (velocity: Vector3) => void;
  setAngularVelocity: (velocity: Vector3) => void;
  getVelocity: () => Vector3;
  getAngularVelocity: () => Vector3;
}

export const usePhysicsObject: <T extends Object3D>() => [
  MutableRefObject<T>,
  PhysicsApi
] = <T extends Object3D>() => {
  const velocity = useRef<Vector3>(new Vector3());
  const angularVelocity = useRef<Vector3>(new Vector3());

  const objectRef = useRef<T>(new Object3D() as T);

  const api: PhysicsApi = {
    setAngularVelocity: (v) => (angularVelocity.current = v),
    setVelocity: (v) => (velocity.current = v),
    getVelocity: () => velocity.current,
    getAngularVelocity: () => angularVelocity.current,
  };

  useFrame((state, elapsedTime) => {
    if (!objectRef.current) {
      return;
    }
    const timeScaler = elapsedTime / 1000;

    objectRef.current.position.add(
      velocity.current.clone().multiplyScalar(timeScaler)
    );
    const rotationEuler = new Euler(
      ...angularVelocity.current.clone().multiplyScalar(timeScaler).toArray()
    );
    objectRef.current.applyQuaternion(
      new Quaternion().setFromEuler(rotationEuler)
    );
  });

  return [objectRef, api];
};
