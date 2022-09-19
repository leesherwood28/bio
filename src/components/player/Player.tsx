import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useLayoutEffect } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGameStore } from '../../state/game-store';
import PlayerIdle from './PlayerIdle';
import PlayerMovement from './PlayerMovement';
import PlayerRunning from './PlayerRunning';
import { useBox } from '@react-three/cannon';
import { Group } from 'three';

const Player: React.FunctionComponent = () => {
  const [playerRef, playerApi] = useBox<Group>(() => ({
    mass: 1,
    position: [0, 3, 5],
    rotation: [0, 0, 0],
  }));

  useLayoutEffect(() => {
    set((s) => ({ player: { ...s.player, ref: playerRef, api: playerApi } }));
  }, [playerRef, playerApi]);

  const set = useGameStore((s) => s.set);

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;
  const { actions } = useAnimations(animations, playerRef);

  useLayoutEffect(() => {
    set((s) => ({ player: { ...s.player, animations: actions } }));
  }, [actions]);

  return (
    <group ref={playerRef}>
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
