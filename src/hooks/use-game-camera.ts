import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Object3D, Vector3 } from 'three';
import { isNil } from '../functions/is-nil.fn';
import { PhysicsApi } from './use-physics-object';

const calculateIdealOffset = (object: Object3D) => {
  const idealOffset = new Vector3(-1, 2, -2.5);
  idealOffset.applyQuaternion(object.quaternion);
  idealOffset.add(object.position);
  return idealOffset;
};

const calculateIdealLookat = (object: Object3D) => {
  const idealLookat = new Vector3(0, 1, 5);
  idealLookat.applyQuaternion(object.quaternion);
  idealLookat.add(object.position);
  return idealLookat;
};

export const useGameCamera = () => {
  const { camera } = useThree();

  const idealLookat = useRef(new Vector3());
  const idealOffset = useRef(new Vector3());

  useFrame((state, delta) => {
    const playerRef = playerApi.objectRef.current;
    if (isNil(playerRef)) {
      return;
    }
    const newIdealOffset = calculateIdealOffset(playerRef);
    const newIdealLookat = calculateIdealLookat(playerRef);

    const lerp = 1.0 - Math.pow(0.001, delta);
    idealOffset.current.lerp(newIdealOffset, lerp);
    idealLookat.current.lerp(newIdealLookat, lerp);

    camera.position.copy(idealOffset.current);
    camera.lookAt(idealLookat.current);
  });
};
