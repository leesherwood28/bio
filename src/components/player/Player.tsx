import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useLayoutEffect } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGameStore } from '../../state/game-store';
import PlayerIdle from './PlayerIdle';
import PlayerMovement from './PlayerMovement';
import PlayerRunning from './PlayerRunning';

const Player: React.FunctionComponent = () => {
  const player = useGameStore((s) => s.player.object);
  const set = useGameStore((s) => s.set);

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;
  const { actions } = useAnimations(animations, player);

  useLayoutEffect(() => {
    set((s) => ({ player: { ...s.player, animations: actions } }));
  }, [actions]);

  return (
    <group ref={player} position={[0, 3, 5]}>
      <primitive
        object={scene}
        rotation={[0, Math.PI, 0]}
        scale={[0.01, 0.01, 0.01]}
      >
        <PlayerIdle />
        <PlayerRunning />
        <PlayerMovement />
      </primitive>
    </group>
  );
};

export default Player;
