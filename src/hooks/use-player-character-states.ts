import { useAnimations } from '@react-three/drei';
import { RefObject, useEffect, useState } from 'react';
import { AnimationAction, AnimationClip, Event, Group, Object3D } from 'three';
import { PhysicsApi } from './use-physics-object';
import { PlayerCharacterState, usePlayerData } from './use-player-data';

const mapStateToAnimation = (
  characterState: PlayerCharacterState,
  actions: {
    [x: string]: AnimationAction | null;
  }
) => {
  if (characterState === 'idle') {
    return actions['Root|Idle 01 '] as AnimationAction;
  }
  if (characterState === 'running') {
    return actions['Root|Run  02 '] as AnimationAction;
  }
  if (characterState === 'walking') {
    const animation = actions['Root|Walk'] as AnimationAction;
    animation.timeScale = 1;
    return animation;
  }
  if (characterState === 'walking-backwards') {
    const animation = actions['Root|Walk'] as AnimationAction;
    animation.timeScale = -1;
    return animation;
  }
  return actions['Root|Idle 01 '] as AnimationAction;
};

const usePlayerCharacterStates = (
  animations: AnimationClip[],
  playerPhysicsApi: PhysicsApi<Object3D>
) => {
  const { actions } = useAnimations(animations, playerPhysicsApi.objectRef);
  const characterState = usePlayerData((s) => s.characterState);
  const [currentAnimation, setAnimation] = useState<AnimationAction>();

  useEffect(() => {
    const animation = mapStateToAnimation(characterState, actions);
    if (currentAnimation) {
      animation.enabled = true;
      animation.crossFadeFrom(currentAnimation, 0.5, false);
    }
    animation.play();
    setAnimation(animation);
  }, [characterState, actions]);
};

export { usePlayerCharacterStates };
