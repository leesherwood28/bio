import React, { useEffect } from 'react';
import { useGameStore } from '../../state/game-store';

const PlayerRunning: React.FunctionComponent = () => {
  const playerState = useGameStore((s) => s.player.state);
  const animations = useGameStore((s) => s.player.animations);
  const currentAnimation = useGameStore((s) => s.player.animation);
  const set = useGameStore((s) => s.set);

  useEffect(() => {
    if (playerState !== 'running') {
      return;
    }
    const runAnimation = animations?.['Root|Run  02 '];
    if (!runAnimation) {
      return;
    }
    if (currentAnimation) {
      runAnimation.enabled = true;
      runAnimation.crossFadeFrom(currentAnimation, 0.5, false);
    }
    runAnimation.play();

    set((s) => ({ player: { ...s.player, animation: runAnimation } }));
  }, [playerState, animations]);

  return null;
};

export default PlayerRunning;
