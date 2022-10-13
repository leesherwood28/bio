import { useAnimations } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { AnimationAction } from 'three';
import { isNil } from '../../functions/is-nil.fn';
import {
  PlayerCharacterState,
  usePlayerData,
} from '../../hooks/use-player-data';
import { usePlayerStore } from '../../store/player.store';

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

const PlayerCharacterStates: React.FunctionComponent = () => {
  const playerAnimations = usePlayerStore((s) => s.playerAnimations);
  const playerApi = usePlayerStore((s) => s.playerApi);
  const { actions } = useAnimations(
    playerAnimations ?? [],
    playerApi?.objectRef
  );
  const characterState = usePlayerData((s) => s.characterState);
  const [currentAnimation, setAnimation] = useState<AnimationAction>();
  useEffect(() => {
    if (isNil(actions)) {
      return;
    }
    const animation = mapStateToAnimation(characterState, actions);
    if (isNil(animation)) {
      return;
    }
    if (currentAnimation) {
      animation.enabled = true;
      animation.crossFadeFrom(currentAnimation, 0.5, false);
    }
    animation.play();
    setAnimation(animation);
  }, [characterState, actions]);

  return null;
};

export default PlayerCharacterStates;
