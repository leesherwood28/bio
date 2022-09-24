import { useAnimations } from '@react-three/drei';
import { RefObject } from 'react';
import { AnimationClip, Event, Group, Object3D } from 'three';

const usePlayerCharacterStates = (
  animations: AnimationClip[],
  playerRef: RefObject<Object3D<Group>>
) => {
  const { actions } = useAnimations(animations, playerRef);
};

export { usePlayerCharacterStates };
