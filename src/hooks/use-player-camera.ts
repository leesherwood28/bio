import { Physics, PublicApi } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Euler, Vector3 } from 'three';
import { PlayerPhysicsData } from '../models/player-physics-data.model';
import { usePlayerPhysicsRef } from './use-player-physics-ref';

const calculateIdealOffset = (playerPhysics: PlayerPhysicsData) => {
  const idealOffset = new Vector3(-3, 4, -6);
  idealOffset.applyEuler(new Euler(...playerPhysics.rotation));
  idealOffset.add(new Vector3(...playerPhysics.position));
  return idealOffset;
};

const calculateIdealLookat = (playerPhysics: PlayerPhysicsData) => {
  const idealLookat = new Vector3(0, 2, 10);
  idealLookat.applyEuler(new Euler(...playerPhysics.rotation));
  idealLookat.add(new Vector3(...playerPhysics.position));
  return idealLookat;
};

export const usePlayerCamera = (api: PublicApi) => {
  const { camera } = useThree();
  const playerPhysics = usePlayerPhysicsRef(api);

  const idealLookat = useRef(new Vector3());
  const idealOffset = useRef(new Vector3());

  useFrame(() => {
    const newIdealOffset = calculateIdealOffset(playerPhysics.current);
    const newIdealLookat = calculateIdealLookat(playerPhysics.current);

    idealOffset.current.copy(newIdealOffset);
    idealLookat.current.copy(newIdealLookat);

    camera.position.copy(idealOffset.current);
    camera.lookAt(idealLookat.current);
  });
};
