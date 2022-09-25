import { useFrame, useThree } from '@react-three/fiber';
import { RefObject, useRef } from 'react';
import { Object3D, Vector3 } from 'three';

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

export const usePlayerCamera = (playerRef: RefObject<Object3D>) => {
  const { camera } = useThree();

  const idealLookat = useRef(new Vector3());
  const idealOffset = useRef(new Vector3());

  useFrame((state, delta) => {
    if (!playerRef.current) {
      return;
    }
    const newIdealOffset = calculateIdealOffset(playerRef.current);
    const newIdealLookat = calculateIdealLookat(playerRef.current);

    const lerp = 1.0 - Math.pow(0.001, delta);
    idealOffset.current.lerp(newIdealOffset, lerp);
    idealLookat.current.lerp(newIdealLookat, lerp);

    camera.position.copy(idealOffset.current);
    camera.lookAt(idealLookat.current);
  });
};
