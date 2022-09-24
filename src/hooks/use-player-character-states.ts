import { useAnimations } from '@react-three/drei';
import { RefObject, useEffect, useState } from 'react';
import { AnimationAction, AnimationClip, Event, Group, Object3D } from 'three';
import { PlayerCharacterState, usePlayerData } from './use-player-data';

const mapStateToAnimation = (
  characterState: PlayerCharacterState,
  actions: {
    [x: string]: AnimationAction | null;
  }
) => {
  const characterActionMap: { [key in PlayerCharacterState]: string } = {
    idle: 'Root|Idle 01 ',
    running: 'Root|Run  02 ',
  };
  return actions[characterActionMap[characterState]] as AnimationAction;
};

const usePlayerCharacterStates = (
  animations: AnimationClip[],
  playerRef: RefObject<Group>
) => {
  const { actions } = useAnimations(animations, playerRef);
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
