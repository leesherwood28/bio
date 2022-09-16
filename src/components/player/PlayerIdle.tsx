import React, { useEffect } from 'react';
import { useGameStore } from '../../state/game-store';

const PlayerIdle: React.FunctionComponent = () => {
  const playerState = useGameStore((s) => s.player.state);
  const animations = useGameStore((s) => s.player.animations);
  const currentAnimation = useGameStore((s) => s.player.animation);
  const set = useGameStore((s) => s.set);

  useEffect(() => {
    if (playerState !== 'idle') {
      return;
    }
    const idleAnimation = animations?.['Root|Idle 01 '];
    if (!idleAnimation) {
      return;
    }

    if (currentAnimation) {
      idleAnimation.enabled = true;
      idleAnimation.crossFadeFrom(currentAnimation, 0.5, false);
    }
    // currentAnimation?.stop();
    idleAnimation.play();
    set((s) => ({ player: { ...s.player, animation: idleAnimation } }));
  }, [playerState, animations]);

  return null;
};

export default PlayerIdle;
