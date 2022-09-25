import { Physics, PublicApi } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Euler, Vector3 } from 'three';
import { PlayerPhysicsData } from '../models/player-physics-data.model';
import { usePlayerPhysicsRef } from './use-player-physics-ref';

const calculateIdealOffset = (playerPhysics: PlayerPhysicsData) => {
  const idealOffset = new Vector3(-1, 1, -2.5);
  idealOffset.applyEuler(new Euler(...playerPhysics.rotation));
  idealOffset.add(new Vector3(...playerPhysics.position));
  return idealOffset;
};

const calculateIdealLookat = (playerPhysics: PlayerPhysicsData) => {
  const idealLookat = new Vector3(0, 1, 5);
  idealLookat.applyEuler(new Euler(...playerPhysics.rotation));
  idealLookat.add(new Vector3(...playerPhysics.position));
  return idealLookat;
};

export const usePlayerCamera = (api: PublicApi) => {
  const { camera } = useThree();
  const playerPhysics = usePlayerPhysicsRef(api);

  const idealLookat = useRef(new Vector3());
  const idealOffset = useRef(new Vector3());

  useFrame((state, delta) => {
    const newIdealOffset = calculateIdealOffset(playerPhysics.current);
    const newIdealLookat = calculateIdealLookat(playerPhysics.current);

    const lerp = 1.0 - Math.pow(0.001, delta);
    idealOffset.current.lerp(newIdealOffset, lerp);
    idealLookat.current.lerp(newIdealLookat, lerp);

    camera.position.copy(idealOffset.current);
    camera.lookAt(idealLookat.current);
  });
};
