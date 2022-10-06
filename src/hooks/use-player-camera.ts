import { useFrame, useThree } from '@react-three/fiber';
import { RigidBodyApiRef } from '@react-three/rapier';
import { RigidBodyApi } from '@react-three/rapier/dist/declarations/src/types';
import { RefObject, useRef } from 'react';
import { Object3D, Vector3 } from 'three';

const calculateIdealOffset = (object: RigidBodyApi) => {
  const idealOffset = new Vector3(-1, 0, -4.5);
  idealOffset.applyQuaternion(object.rotation());
  idealOffset.add(object.translation());
  return idealOffset;
};

const calculateIdealLookat = (object: RigidBodyApi) => {
  const idealLookat = new Vector3(0, 1, 5);
  idealLookat.applyQuaternion(object.rotation());
  idealLookat.add(object.translation());
  return idealLookat;
};

export const usePlayerCamera = (api: RigidBodyApiRef) => {
  const { camera } = useThree();

  const idealLookat = useRef(new Vector3());
  const idealOffset = useRef(new Vector3());

  useFrame((state, delta) => {
    if (!api.current) {
      return;
    }
    const newIdealOffset = calculateIdealOffset(api.current);
    const newIdealLookat = calculateIdealLookat(api.current);

    const lerp = 1.0 - Math.pow(0.001, delta);
    idealOffset.current.lerp(newIdealOffset, lerp);
    idealLookat.current.lerp(newIdealLookat, lerp);

    camera.position.copy(idealOffset.current);
    camera.lookAt(idealLookat.current);
  });
};
