import { useThree } from '@react-three/fiber';
import { RefObject } from 'react';
import { Group } from 'three';

export const usePlayerCamera = (playerRef: RefObject<Group>) => {
  const { camera } = useThree();
};
