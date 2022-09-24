import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useLayoutEffect } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import PlayerIdle from './PlayerIdle';
import PlayerMovement from './PlayerMovement';
import PlayerRunning from './PlayerRunning';
import { useBox, useSphere, useParticle } from '@react-three/cannon';
import { Group, Mesh } from 'three';
import { usePlayerCharacterStates } from '../../hooks/use-player-character-states';

const Player: React.FunctionComponent = () => {
  const [playerRef, api] = useSphere<Group>(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0],
  }));

  const { scene, animations } = useGLTF(
    '/player/scene.gltf',
    'https://www.gstatic.com/draco/versioned/decoders/1.4.0/'
  ) as GLTF;
  const { actions } = useAnimations(animations, playerRef);

  usePlayerCharacterStates(animations, playerRef);

  return (
    <>
      <group ref={playerRef}>
        <mesh>
          <boxGeometry />
          <meshLambertMaterial color='hotpink' transparent opacity={0.4} />
        </mesh>
        <primitive
          object={scene}
          rotation={[0, Math.PI, 0]}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.05, 1.85, 0.1]}
          castShadow
          receiveShadow
        >
          <PlayerIdle />
          <PlayerRunning />
          <PlayerMovement />
        </primitive>
      </group>
    </>
  );
};

export default Player;
